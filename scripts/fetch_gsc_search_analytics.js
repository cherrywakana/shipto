/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { google } = require('googleapis');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const OUTPUT_DIR = path.resolve(__dirname, '../tmp/growth-metrics/gsc');
const GSC_SITE_URL = process.env.GSC_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'sc-domain:original-price.com';
const GSC_SERVICE_ACCOUNT_KEY_PATH = process.env.GSC_SERVICE_ACCOUNT_KEY_PATH;
const GSC_SERVICE_ACCOUNT_KEY_JSON = process.env.GSC_SERVICE_ACCOUNT_KEY_JSON;
const GSC_SERVICE_ACCOUNT_CLIENT_EMAIL = process.env.GSC_SERVICE_ACCOUNT_CLIENT_EMAIL;
const GSC_SERVICE_ACCOUNT_PRIVATE_KEY = process.env.GSC_SERVICE_ACCOUNT_PRIVATE_KEY;

function parseArgs(argv) {
    const args = {
        startDate: null,
        endDate: null,
        dimensions: ['page', 'query'],
        rowLimit: 250,
        type: 'web',
    };

    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i];
        if (arg === '--start-date' && argv[i + 1]) {
            args.startDate = argv[++i];
        } else if (arg === '--end-date' && argv[i + 1]) {
            args.endDate = argv[++i];
        } else if (arg === '--dimensions' && argv[i + 1]) {
            args.dimensions = argv[++i].split(',').map((value) => value.trim()).filter(Boolean);
        } else if (arg === '--row-limit' && argv[i + 1]) {
            args.rowLimit = Number(argv[++i]) || args.rowLimit;
        } else if (arg === '--type' && argv[i + 1]) {
            args.type = argv[++i];
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

function loadServiceAccountCredentials() {
    if (GSC_SERVICE_ACCOUNT_KEY_JSON) {
        return JSON.parse(GSC_SERVICE_ACCOUNT_KEY_JSON);
    }

    if (GSC_SERVICE_ACCOUNT_CLIENT_EMAIL && GSC_SERVICE_ACCOUNT_PRIVATE_KEY) {
        return {
            client_email: GSC_SERVICE_ACCOUNT_CLIENT_EMAIL,
            private_key: GSC_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
        };
    }

    return null;
}

async function createAuthClient() {
    const credentials = loadServiceAccountCredentials();

    if (credentials) {
        return new google.auth.GoogleAuth({
            credentials,
            scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
        });
    }

    if (GSC_SERVICE_ACCOUNT_KEY_PATH) {
        return new google.auth.GoogleAuth({
            keyFile: path.resolve(process.cwd(), GSC_SERVICE_ACCOUNT_KEY_PATH),
            scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
        });
    }

    throw new Error(
        'Missing GSC credentials. Set GSC_SERVICE_ACCOUNT_KEY_PATH, GSC_SERVICE_ACCOUNT_KEY_JSON, or GSC_SERVICE_ACCOUNT_CLIENT_EMAIL + GSC_SERVICE_ACCOUNT_PRIVATE_KEY.'
    );
}

function buildOutputPayload(args, rows, responseMeta) {
    return {
        source: 'google-search-console',
        siteUrl: GSC_SITE_URL,
        fetchedAt: new Date().toISOString(),
        request: {
            startDate: args.startDate,
            endDate: args.endDate,
            dimensions: args.dimensions,
            rowLimit: args.rowLimit,
            type: args.type,
        },
        totals: {
            rows: rows.length,
            clicks: rows.reduce((sum, row) => sum + (row.clicks || 0), 0),
            impressions: rows.reduce((sum, row) => sum + (row.impressions || 0), 0),
        },
        responseMeta,
        rows: rows.map((row) => ({
            keys: row.keys || [],
            clicks: row.clicks || 0,
            impressions: row.impressions || 0,
            ctr: row.ctr || 0,
            position: row.position || 0,
        })),
    };
}

async function main() {
    ensureDir(OUTPUT_DIR);

    const args = parseArgs(process.argv.slice(2));
    const defaultDates = getDefaultDateRange();
    args.startDate = args.startDate || defaultDates.startDate;
    args.endDate = args.endDate || defaultDates.endDate;

    const auth = await createAuthClient();
    const client = await auth.getClient();
    const searchconsole = google.searchconsole({ version: 'v1', auth: client });

    const response = await searchconsole.searchanalytics.query({
        siteUrl: GSC_SITE_URL,
        requestBody: {
            startDate: args.startDate,
            endDate: args.endDate,
            dimensions: args.dimensions,
            rowLimit: args.rowLimit,
            type: args.type,
        },
    });

    const rows = response.data.rows || [];
    const payload = buildOutputPayload(args, rows, {
        responseAggregationType: response.data.responseAggregationType || null,
    });

    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    const outputPath = path.join(OUTPUT_DIR, `search-analytics-${stamp}.json`);
    fs.writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`);

    console.log(JSON.stringify({
        ok: true,
        outputPath,
        siteUrl: GSC_SITE_URL,
        rows: rows.length,
        startDate: args.startDate,
        endDate: args.endDate,
    }, null, 2));
}

main().catch((error) => {
    console.error(error.message || error);
    process.exit(1);
});
