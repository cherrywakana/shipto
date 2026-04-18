/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const OUTPUT_DIR = path.resolve(__dirname, '../tmp/growth-metrics/skimlinks');

function parseArgs(argv) {
    const args = {
        mode: 'csv',
        input: null,
        startDate: null,
        endDate: null,
        report: 'page',
        timezone: process.env.SKIMLINKS_REPORT_TIMEZONE || 'Asia/Tokyo',
    };

    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i];
        if (arg === '--mode' && argv[i + 1]) {
            args.mode = argv[++i];
        } else if (arg === '--input' && argv[i + 1]) {
            args.input = argv[++i];
        } else if (arg === '--start-date' && argv[i + 1]) {
            args.startDate = argv[++i];
        } else if (arg === '--end-date' && argv[i + 1]) {
            args.endDate = argv[++i];
        } else if (arg === '--report' && argv[i + 1]) {
            args.report = argv[++i];
        } else if (arg === '--timezone' && argv[i + 1]) {
            args.timezone = argv[++i];
        }
    }

    return args;
}

function ensureDir(dirPath) {
    fs.mkdirSync(dirPath, { recursive: true });
}

function formatDate(date) {
    return date.toISOString().slice(0, 10);
}

function getDefaultDateRange() {
    const end = new Date();
    end.setUTCDate(end.getUTCDate() - 1);

    const start = new Date(end);
    start.setUTCDate(start.getUTCDate() - 27);

    return {
        startDate: formatDate(start),
        endDate: formatDate(end),
    };
}

function parseCsv(text) {
    const rows = [];
    let current = '';
    let row = [];
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const next = text[i + 1];

        if (char === '"') {
            if (inQuotes && next === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            row.push(current);
            current = '';
        } else if ((char === '\n' || char === '\r') && !inQuotes) {
            if (char === '\r' && next === '\n') i++;
            row.push(current);
            if (row.some((value) => value !== '')) rows.push(row);
            row = [];
            current = '';
        } else {
            current += char;
        }
    }

    if (current || row.length) {
        row.push(current);
        if (row.some((value) => value !== '')) rows.push(row);
    }

    if (rows.length === 0) return [];

    const headers = rows[0].map((header) => header.trim());
    return rows.slice(1).map((values) => {
        const item = {};
        headers.forEach((header, index) => {
            item[header] = values[index] || '';
        });
        return item;
    });
}

function normalizeNumber(value) {
    if (typeof value === 'number') return value;
    if (!value) return 0;

    const normalized = String(value).replace(/[$,%\s,]/g, '');
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeRows(rows) {
    return rows.map((row) => {
        const normalized = {};

        Object.entries(row).forEach(([key, value]) => {
            const trimmedKey = String(key).trim();
            const trimmedValue = typeof value === 'string' ? value.trim() : value;
            normalized[trimmedKey] = trimmedValue;
        });

        if ('Revenue' in normalized) normalized.Revenue = normalizeNumber(normalized.Revenue);
        if ('Clicks' in normalized) normalized.Clicks = normalizeNumber(normalized.Clicks);
        if ('Sales' in normalized) normalized.Sales = normalizeNumber(normalized.Sales);
        if ('Order Value' in normalized) normalized['Order Value'] = normalizeNumber(normalized['Order Value']);

        return normalized;
    });
}

async function fetchViaApi(args) {
    const endpoint = process.env.SKIMLINKS_REPORTING_API_URL;
    const apiKey = process.env.SKIMLINKS_API_KEY;

    if (!endpoint || !apiKey) {
        throw new Error('API mode requires SKIMLINKS_REPORTING_API_URL and SKIMLINKS_API_KEY.');
    }

    const apiKeyHeader = process.env.SKIMLINKS_API_KEY_HEADER || 'Authorization';
    const apiKeyPrefix = process.env.SKIMLINKS_API_KEY_PREFIX || 'Bearer';

    const headers = {
        Accept: 'application/json',
        [apiKeyHeader]: apiKeyPrefix ? `${apiKeyPrefix} ${apiKey}` : apiKey,
    };

    const response = await axios.get(endpoint, {
        headers,
        params: {
            start_date: args.startDate,
            end_date: args.endDate,
            report: args.report,
            timezone: args.timezone,
        },
        timeout: 30000,
    });

    const rows = Array.isArray(response.data?.rows)
        ? response.data.rows
        : Array.isArray(response.data)
            ? response.data
            : [];

    return {
        mode: 'api',
        raw: response.data,
        rows: normalizeRows(rows),
    };
}

function fetchViaCsv(args) {
    const inputPath = args.input || process.env.SKIMLINKS_EXPORT_PATH;

    if (!inputPath) {
        throw new Error('CSV mode requires --input or SKIMLINKS_EXPORT_PATH.');
    }

    const resolved = path.resolve(process.cwd(), inputPath);
    const text = fs.readFileSync(resolved, 'utf8');
    const rows = normalizeRows(parseCsv(text));

    return {
        mode: 'csv',
        inputPath: resolved,
        rows,
    };
}

function buildPayload(args, source) {
    return {
        source: 'skimlinks',
        mode: source.mode,
        fetchedAt: new Date().toISOString(),
        request: {
            startDate: args.startDate,
            endDate: args.endDate,
            report: args.report,
            timezone: args.timezone,
        },
        inputPath: source.inputPath || null,
        totals: {
            rows: source.rows.length,
            clicks: source.rows.reduce((sum, row) => sum + normalizeNumber(row.Clicks), 0),
            sales: source.rows.reduce((sum, row) => sum + normalizeNumber(row.Sales), 0),
            revenue: source.rows.reduce((sum, row) => sum + normalizeNumber(row.Revenue), 0),
        },
        rows: source.rows,
        raw: source.raw || null,
    };
}

async function main() {
    ensureDir(OUTPUT_DIR);

    const args = parseArgs(process.argv.slice(2));
    const defaultDates = getDefaultDateRange();
    args.startDate = args.startDate || defaultDates.startDate;
    args.endDate = args.endDate || defaultDates.endDate;

    const source = args.mode === 'api'
        ? await fetchViaApi(args)
        : fetchViaCsv(args);

    const payload = buildPayload(args, source);
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    const outputPath = path.join(OUTPUT_DIR, `skimlinks-${args.report}-${stamp}.json`);
    fs.writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`);

    console.log(JSON.stringify({
        ok: true,
        mode: source.mode,
        outputPath,
        rows: payload.totals.rows,
        revenue: payload.totals.revenue,
    }, null, 2));
}

main().catch((error) => {
    console.error(error.message || error);
    process.exit(1);
});
