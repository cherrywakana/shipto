const { createClient } = require('@supabase/supabase-js');
const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();

chromium.use(stealth);

const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local if not already set
const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value && !process.env[key.trim()]) {
            process.env[key.trim()] = value.trim();
        }
    });
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 各ショップのURL構造ルール（これを拡張すればどんどん収集対象を増やせます）
const SHOP_RULES = {
    'ssense': (slug) => `https://www.ssense.com/ja-jp/men/designers/${slug}`,
    'farfetch': (slug) => `https://www.farfetch.com/jp/shopping/men/${slug}/items.aspx`,
    'cettire': (slug) => `https://www.cettire.com/jp/collections/${slug}`,
    'luisaviaroma': (slug) => `https://www.luisaviaroma.com/ja-jp/shop/%E3%83%A1%E3%83%B3%E3%82%BA/${slug}`,
    'mytheresa': (slug) => `https://www.mytheresa.com/jp/en/men/designers/${slug}`,
    'net-a-porter': (slug) => `https://www.net-a-porter.com/en-jp/shop/designer/${slug}`,
    'the-outnet': (slug) => `https://www.theoutnet.com/ja-jp/shop/designers/${slug}`,
    'shopbop': (slug) => `https://www.shopbop.com/${slug}/br/v=1/73023.htm`,
    'hbx': (slug) => `https://hbx.com/jp/men/brands/${slug}`,
    'end': (slug) => `https://www.endclothing.com/jp/brands/${slug}`,
    'end-clothing': (slug) => `https://www.endclothing.com/jp/brands/${slug}`,
    'stadium-goods': (slug) => `https://www.stadiumgoods.com/en-jp/shopping/${slug}`,
    'jd-sports': (slug) => `https://www.jdsports.co.uk/brand/${slug}/`,
    'beyond-retro': (slug) => `https://www.beyondretro.com/search?q=${slug}`,
    'footasylum': (slug) => `https://www.footasylum.com/brands/${slug}/`,
    'triads': (slug) => `https://www.triads.co.uk/collections/${slug}`,
    'allike-store': (slug) => `https://www.allikestore.com/collections/${slug}`,
    'bodega': (slug) => `https://bdgastore.com/collections/${slug}`,
    'klekt': (slug) => `https://www.klekt.com/catalog/sneakers?brand=${slug}`,
    'flight-club': (slug) => `https://www.flightclub.com/${slug}`,
    'urban-industry': (slug) => `https://www.urbanindustry.co.uk/collections/${slug}`,
    'foot-patrol': (slug) => `https://www.footpatrol.com/brand/${slug}/`,
    'size': (slug) => `https://www.size.co.uk/brand/${slug}/`,
    'asphaltgold': (slug) => `https://www.asphaltgold.com/en/collections/${slug}`,
    'overkill': (slug) => `https://www.overkillshop.com/en/brands/${slug}`,
    'mr-porter': (slug) => `https://www.mrporter.com/en-jp/mens/designers/${slug}`,
    'rei': (slug) => `https://www.rei.com/brand/${slug}`,
    'sneakersnstuff': (slug) => `https://www.sneakersnstuff.com/en/search/searchbytext?key=${slug}`,
    'mango': (slug) => `https://shop.mango.com/jp/search?kw=${slug}`,
    'vestiaire-collective': (slug) => `https://www.vestiairecollective.com/designers/${slug}/`,
    'nordstrom': (slug) => `https://www.nordstrom.com/brands/${slug}`,
    'selfridges': (slug) => `https://www.selfridges.com/JP/en/cat/${slug}/`,
    'revolve': (slug) => `https://www.revolve.com/${slug}/br/`,
    'bikeinn': (slug) => `https://www.tradeinn.com/bikeinn/ja/search/${slug}`,
    'bike24': (slug) => `https://www.bike24.com/brands/${slug}`,
    'sigma-sports': (slug) => `https://www.sigmasports.com/brand/${slug}`,
    'rapha': (slug) => `https://www.rapha.cc/jp/ja/shop/${slug}`,
    'ribble-cycles': (slug) => `https://www.ribblecycles.co.uk/search/?q=${slug}`,
    'evans-cycles': (slug) => `https://www.evanscycles.com/brand/${slug}`,
    'condor-cycles': (slug) => `https://www.condorcycles.com/collections/vendors?q=${slug}`,
    'mantel': (slug) => `https://www.mantel.com/en/${slug}`,
    'bike-discount': (slug) => `https://www.bike-discount.de/en/${slug}`,
    'bike-components': (slug) => `https://www.bike-components.de/en/${slug}/`,
    'bikeroom': (slug) => `https://www.bike-room.com/en/search/?q=${slug}`,
    'bellatisport': (slug) => `https://www.bellatisport.com/shop/search.html?q=${slug}`,
    'dragon-bike': (slug) => `https://dragonbike.net/search?q=${slug}`,
    'codibook': (slug) => `https://codibook.net/search?q=${slug}`,
    'hififnk': (slug) => `https://hififnk.com/product/search.html?keyword=${slug}`,
    'style-nanda': (slug) => `https://jp.stylenanda.com/product/search.html?keyword=${slug}`,
    'dholic': (slug) => `https://www.dholic.co.jp/Nshopping/Search.asp?searchText=${slug}`,
    'chuu': (slug) => `https://chuu.jp/product/search.html?keyword=${slug}`,
    'mardi-mercredi': (slug) => `https://jp.mardimercredi.com/product/search.html?keyword=${slug}`,
    'matin-kim': (slug) => `https://matinkim.shop/product/search.html?keyword=${slug}`,
    'marithe-official': (slug) => `https://marithe-official.com/product/search.html?keyword=${slug}`,
    'hotping': (slug) => `https://hotping.jp/product/search.html?keyword=${slug}`,
    '66girls': (slug) => `https://66girls.jp/product/search.html?keyword=${slug}`,
    'attrangs': (slug) => `https://attrangs.jp/product/search.html?keyword=${slug}`,
    'sonyunara': (slug) => `https://sonyunara.jp/product/search.html?keyword=${slug}`,
    'covernat': (slug) => `https://covernat.jp/product/search.html?keyword=${slug}`,
    'kirsh': (slug) => `https://kirsh.jp/product/search.html?keyword=${slug}`,
    'lmc': (slug) => `https://lostmanagementcities.com/product/search.html?keyword=${slug}`,
    'minitmute': (slug) => `https://minitmute.jp/product/search.html?keyword=${slug}`,
    'glowny': (slug) => `https://glowny.co.kr/product/search.html?keyword=${slug}`,
    'siyazu': (slug) => `https://siyazu.co.kr/product/search.html?keyword=${slug}`,
    'nerdy': (slug) => `https://nerdy.jp/product/search.html?keyword=${slug}`,
    'urban-revivo': (slug) => `https://www.urbanrevivo.com/search?q=${slug}`,
    'li-ning': (slug) => `https://www.lining.com/search?q=${slug}`,
    'feng-chen-wang': (slug) => `https://www.fengchenwang.com/search?q=${slug}`,
    'shushu-tong': (slug) => `https://www.shushutongstudio.com/search?q=${slug}`,
    'uma-wang': (slug) => `https://www.umawang.com/search?q=${slug}`,
    'bosideng': (slug) => `https://www.bosidengfashion.com/search?q=${slug}`,
    'labelhood': (slug) => `https://labelhood.com/search?q=${slug}`,
    'shein': (slug) => `https://jp.shein.com/pdsearch/${slug}`,
    'temu': (slug) => `https://www.temu.com/jp/search_result.html?search_key=${slug}`,
    'aliexpress': (slug) => `https://www.aliexpress.com/w/wholesale-${slug}.html`,
    'cider': (slug) => `https://jp.shopcider.com/search?q=${slug}`,
    'romwe': (slug) => `https://jp.romwe.com/pdsearch/${slug}`,
    'pinkoi': (slug) => `https://jp.pinkoi.com/search?q=${slug}`,
    'gentlewoman': (slug) => `https://www.gentlewomanonline.com/catalogsearch/result/?q=${slug}`,
    'beyondthevines': (slug) => `https://beyondthevines.jp/search?q=${slug}`,
    'lovebonito': (slug) => `https://www.lovebonito.com/intl/catalogsearch/result/?q=${slug}`,
    'hbx': (slug) => `https://hbx.com/jp/search?q=${slug}`,
    'juicestore': (slug) => `https://juicestore.com/search?q=${slug}`,
    'and-other-stories': (slug) => `https://www.stories.com/en/search.html?q=${slug}`,
    'harrods': (slug) => `https://www.harrods.com/en-jp/shopping/${slug}`,
    'ln-cc': (slug) => `https://www.ln-cc.com/en/designers/${slug}/`,
    'stockx': (slug) => `https://stockx.com/search?s=${slug}`,
    'cos': (slug) => `https://www.cos.com/en/search.html?q=${slug}`,
    'giglio': (slug) => `https://www.giglio.com/eng/designers/${slug}/`,
    '24s': (slug) => `https://www.24s.com/en-jp/${slug}`,
    'svd': (slug) => `https://www.sivasdescalzo.com/en/designers/${slug}`,
    'asos': (slug) => `https://www.asos.com/search/?q=${slug}`,
    'goat': (slug) => `https://www.goat.com/search?query=${slug}`,
    'backcountry': (slug) => `https://www.backcountry.com/${slug}`,
    'yoox': (slug) => `https://www.yoox.com/jp/men/shoponline/${slug}`,
    'fwrd': (slug) => `https://www.fwrd.com/brand/${slug}/`,
    'italist': (slug) => `https://www.italist.com/en-jp/designers/${slug}/`,
    'musinsa': (slug) => `https://global.musinsa.com/jp/brands/${slug}`,
    'lookfantastic': (slug) => `https://www.lookfantastic.jp/brands/${slug}.list`,
    'browns-fashion': (slug) => `https://www.brownsfashion.com/jp/shopping/men/${slug}/items.aspx`,
    'garmentory': (slug) => `https://www.garmentory.com/sale/all/all/designer/${slug}`,
    'llbean': (slug) => `https://www.llbean.co.jp/search?q=${slug}`,
    'bstn': (slug) => `https://www.bstn.com/en/brands/${slug}`,
    'saks-fifth-avenue': (slug) => `https://www.saksfifthavenue.com/brand/${slug}`,
    'slamjam': (slug) => `https://slamjam.com/collections/${slug}`,
    // New Shops
    'cult-beauty': (slug) => `https://www.cultbeauty.com/c/brands/${slug}/`,
    'antonioli': (slug) => `https://antonioli.eu/ja-jp/collections/designer-${slug}-man`,
    'beauty-bay': (slug) => `https://www.beautybay.com/brand/${slug}/`,
    'tres-bien': (slug) => `https://tres-bien.com/${slug}`,
    'goodhood': (slug) => `https://goodhoodstore.com/collections/${slug}`,
    'foot-district': (slug) => `https://footdistrict.com/en/${slug}`,
    'naked-cph': (slug) => `https://www.nakedcph.com/en/collections/${slug}`,
    'olive-young': (slug) => `https://global.oliveyoung.com/search?q=${slug}`,
    'yesstyle': (slug) => `https://www.yesstyle.com/ja/list.html?q=${slug}`,
    'vintage-qoo': (slug) => `https://www.qoo-online.com/catalogsearch/result/?q=${slug}`,
    'ragtag': (slug) => `https://www.ragtag-global.com/catalogsearch/result/?q=${slug}`,
    'hedy': (slug) => `https://www.hedy.jp/search?q=${slug}`,
    'playful': (slug) => `https://www.playful-dc.com/products/list.php?name=${slug}`,
    'sephora': (slug) => `https://www.sephora.com/search?keyword=${slug}`,
    'liberty-london': (slug) => `https://www.libertylondon.com/uk/search?q=${slug}`,
    'veja': (slug) => `https://www.veja-store.com/en_en/catalogsearch/result/?q=${slug}`,
    'space-nk': (slug) => `https://www.spacenk.com/uk/search?q=${slug}`,
    'currentbody': (slug) => `https://www.currentbody.com/search?q=${slug}`,
    'kith': (slug) => `https://kith.com/search?q=${slug}`,
    'patta': (slug) => `https://www.patta.nl/search?q=${slug}`,
    'highsnobiety': (slug) => `https://www.highsnobiety.com/shop/search?q=${slug}`,
    'modes': (slug) => `https://www.modes.com/en-jp/designers/${slug}`,
    'tessabit': (slug) => `https://www.tessabit.com/en-jp/man/designer/${slug}.html`,
    'julian-fashion': (slug) => `https://www.julian-fashion.com/en-jp/designer/${slug}`,
    'base-blu': (slug) => `https://www.baseblu.com/en-jp/designer/${slug}`,
    'd-aniello': (slug) => `https://daniello.com/it-it/collections/${slug}`,
    'urban-outfitters': (slug) => `https://www.urbanoutfitters.com/search?q=${slug}`,
    'lids': (slug) => `https://www.lids.com/search?query=${slug}`,
    'amazingstore': (slug) => `https://amazingstore.jp/?mode=srh&keyword=${slug}`,

    // --- AUTO-GENERATED FALLBACK SEARCH RULES ---
    'ld-mountain-centre': (slug) => `https://www.ldmountaincentre.com/search?q=${slug}`,
    'ellis-brigham': (slug) => `https://www.ellis-brigham.com/search?q=${slug}`,
    'anthropologie': (slug) => `https://www.anthropologie.com/search?q=${slug}`,
    'tradeinn': (slug) => `https://www.tradeinn.com/bikeinn/jp/search?q=${slug}`,
    'west-elm': (slug) => `https://www.westelm.com/search?q=${slug}`,
    'nordic-nest': (slug) => `https://www.nordicnest.jp/search?q=${slug}`,
    'finnish-design-shop': (slug) => `https://www.finnishdesignshop.com/search?q=${slug}`,
    'royal-design': (slug) => `https://royaldesign.com/jp/search?q=${slug}`,
    'canyon': (slug) => `https://www.canyon.com/ja-jp/search?q=${slug}`,
    'kare': (slug) => `https://kare.co.jp/search?q=${slug}`,
    'dhgate': (slug) => `https://www.dhgate.com/search?q=${slug}`,
    'evanscycles': (slug) => `https://www.evanscycles.com/search?q=${slug}`,
    'sportsshoes': (slug) => `https://www.sportsshoes.com/search?q=${slug}`,
    'the-conran-shop': (slug) => `https://www.conranshop.jp/search?q=${slug}`,
    'flymee': (slug) => `https://flymee.jp/search?q=${slug}`,
    'muse-home': (slug) => `https://musehome.shop/search?q=${slug}`,
    'the-whisky-exchange': (slug) => `https://www.thewhiskyexchange.com/search?q=${slug}`,
    'master-of-malt': (slug) => `https://www.masterofmalt.com/search?q=${slug}`,
    'whisky-international-online': (slug) => `https://whiskyinternationalonline.com/search?q=${slug}`,
    'the-whisky-barrel': (slug) => `https://www.thewhiskybarrel.com/search?q=${slug}`,
    'fine-drams': (slug) => `https://www.finedrams.com/search?q=${slug}`,
    'trekkinn': (slug) => `https://www.tradeinn.com/trekkinn/en/search?q=${slug}`,
    'hard-to-find-whisky': (slug) => `https://www.htfw.com/search?q=${slug}`,
    'royal-mile-whiskies': (slug) => `https://www.royalmilewhiskies.com/search?q=${slug}`,
    'whiskybase-shop': (slug) => `https://shop.whiskybase.com/search?q=${slug}`,
    'starbike': (slug) => `https://www.starbike.com/en/search?q=${slug}`,
    'flannels': (slug) => `https://www.flannels.com/search?q=${slug}`,
    'carters': (slug) => `https://www.carters.com/search?q=${slug}`,
    'childrensalon': (slug) => `https://www.childrensalon.com/search?q=${slug}`,
    'patpat': (slug) => `https://www.patpat.com/search?q=${slug}`,
    'next-kids': (slug) => `https://www.nextdirect.com/jp/ja/search?q=${slug}`,
    'babyshop': (slug) => `https://www.babyshop.com/search?q=${slug}`,
    'boden': (slug) => `https://www.boden.co.uk/search?q=${slug}`,
    'the-childrens-place': (slug) => `https://www.childrensplace.com/search?q=${slug}`,
    'hanna-andersson': (slug) => `https://www.hannaandersson.com/search?q=${slug}`,
    'feature': (slug) => `https://feature.com/search?q=${slug}`,
    'smallable': (slug) => `https://en.smallable.com/search?q=${slug}`,
    'vertbaudet': (slug) => `https://www.vertbaudet.com/search?q=${slug}`,
    'geekbuying': (slug) => `https://www.geekbuying.com/search?q=${slug}`,
    'banggood': (slug) => `https://www.banggood.com/search?q=${slug}`,
    'gshopper': (slug) => `https://www.gshopper.com/search?q=${slug}`,
    'etoren': (slug) => `https://jp.etoren.com/search?q=${slug}`,
    'bh-photo-video': (slug) => `https://www.bhphotovideo.com/search?q=${slug}`,
    'zaful': (slug) => `https://www.zaful.com/search?q=${slug}`,
    'deporvillage': (slug) => `https://www.deporvillage.net/search?q=${slug}`,
    'free-people': (slug) => `https://www.freepeople.com/search?q=${slug}`,
    'merlincycles': (slug) => `https://www.merlincycles.com/search?q=${slug}`,
    'wildbounds': (slug) => `https://wildbounds.com/search?q=${slug}`,
    'snowcountry': (slug) => `https://www.snowcountry.eu/search?q=${slug}`,
    'beyond-the-vines': (slug) => `https://beyondthevines.jp/search?q=${slug}`,
    'h-lorenzo': (slug) => `https://www.hlorenzo.com/search?q=${slug}`,
    'solebox': (slug) => `https://www.solebox.com/search?q=${slug}`,
    'dover-street-market': (slug) => `https://shop.doverstreetmarket.com/search?q=${slug}`,
    'hyperlite-mountain-gear': (slug) => `https://www.hyperlitemountaingear.com/search?q=${slug}`,
    'love-bonito': (slug) => `https://www.lovebonito.com/intl/search?q=${slug}`,
    'kicks-crew': (slug) => `https://www.kickscrew.com/search?q=${slug}`,
    'daniello': (slug) => `https://daniello.com/search?q=${slug}`,
    'juice-store': (slug) => `https://juicestore.com/search?q=${slug}`,
    'ultralight-outdoor-gear': (slug) => `https://ultralightoutdoorgear.co.uk/search?q=${slug}`,
    'w-concept': (slug) => `https://us.wconcept.com/search?q=${slug}`,
    'varuste': (slug) => `https://varuste.net/en/search?q=${slug}`,

    // --- AUTO-GENERATED FALLBACK SEARCH RULES ---
    'fc-moto': (slug) => `https://www.fc-moto.de/search?q=${slug}`,
    'xlmoto': (slug) => `https://www.xlmoto.com/search?q=${slug}`,
    'motardinn': (slug) => `https://www.tradeinn.com/motardinn/ja/search?q=${slug}`,
    'louis-motorrad': (slug) => `https://www.louis.eu/search?q=${slug}`,
    'chromeburner': (slug) => `https://www.chromeburner.com/search?q=${slug}`,
    'champion-helmets': (slug) => `https://www.championhelmets.com/search?q=${slug}`,
    'revzilla': (slug) => `https://www.revzilla.com/search?q=${slug}`,
    'burnout-italy': (slug) => `https://www.burnoutmotor.com/search?q=${slug}`,
};

const NEGATIVE_KEYWORDS = [
    '見つかりませんでした',
    'no results found',
    'お探しのページ',
    '0 results',
    '0 items',
    '0件',
    '商品はありません',
    'no products',
    'could not find',
    'didn\'t match any',
    '次の検索結果を表示中', // L.L.Bean fallback
    'we couldn\'t find results for your search', // SpaceNK
    'oops... we were unable to find', // Size?
    'search results for: ""',
    'no matching items',
    '現在、お客様の条件に一致する項目はありません',
    '商品が見つかりません',
    '0 of 0 products',
    '0 products',
    'まだ商品がありません',
    'hbx.catalog.no_products',
    'お探しのアイテムが見つかりませんでした',
    'お探しのページが見つかりません',
    'Pre-owned',
    '中古',
    'THE OUTNETの日本サイトは営業を休止しております'
];

async function verifyBrandPage(page, url, brandName) {
    try {
        console.log(`📡 Accessing: ${url}`);
        const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

        if (!response || response.status() >= 400) {
            return false;
        }

        const noResults = await page.evaluate((Keywords) => {
            const body = document.body.innerText.toLowerCase();
            return Keywords.some(kw => body.includes(kw.toLowerCase()));
        }, NEGATIVE_KEYWORDS);

        if (noResults) return false;

        // 2. Main Content Keyword Verification (Crucial for COS/FWRD/L.L.Bean)
        const hasKeywordInContent = await page.evaluate((name) => {
            const lowerName = name.toLowerCase();

            // Find the main content area (excluding header/footer/sidebar if possible)
            const mainContent = document.querySelector('main') ||
                document.querySelector('#main-content') ||
                document.querySelector('.main-content') ||
                document.body;

            const text = mainContent.innerText.toLowerCase();

            // Check if brand name is in the main content
            if (!text.includes(lowerName)) return false;

            // Extra check for generic landing pages (FWRD, etc.)
            const h1 = document.querySelector('h1')?.innerText.trim().toLowerCase() || "";
            const genericTitles = [
                'all products', 'new arrivals', 'all designers', 'search results', 'items', 'products',
                'men', 'women', 'clothing', 'shoes', 'accessories', 'sale'
            ];

            // Specific site selectors for product items
            const productSelectors = [
                '.productListItem', // Size?, JD Sports
                '.product-grids__link', // FWRD
                '.product-item', // Common
                '.product-card', // Common
                'article' // Common semantic
            ];

            let foundActualProduct = false;
            for (const selector of productSelectors) {
                const items = mainContent.querySelectorAll(selector);
                if (items.length > 0) {
                    // Check if at least one of the first few items contains the brand name in its text or link
                    for (let i = 0; i < Math.min(items.length, 5); i++) {
                        const itemText = items[i].innerText.toLowerCase();
                        const itemHref = items[i].querySelector('a')?.href.toLowerCase() || items[i].href?.toLowerCase() || "";
                        if (itemText.includes(lowerName) || itemHref.includes(lowerName)) {
                            foundActualProduct = true;
                            break;
                        }
                    }
                }
                if (foundActualProduct) break;
            }

            // If we found products but NONE of them match the brand, it's likely "Recommended" or "All Products" (False Positive)
            if (!foundActualProduct) {
                // Only fallback to H1/Breadcrumbs if there were truly NO products found with the selectors
                const anyProductsAtAll = mainContent.querySelectorAll(productSelectors.join(',')).length > 0;
                if (anyProductsAtAll) return false;

                // Try one last check in H1 or breadcrumbs for empty category pages
                const breadcrumbs = document.querySelector('.breadcrumbs, .breadcrumb, [class*="breadcrumb"]')?.innerText.toLowerCase() || "";
                if (h1.includes(lowerName) || breadcrumbs.includes(lowerName)) {
                    return true;
                }
                return false;
            }

            // Size? specific: If there's an error message but brand is found in footer
            const bodyText = document.body.innerText.toLowerCase();
            if (bodyText.includes('oops') || bodyText.includes('unable to find') || bodyText.includes('we were unable to find')) {
                return false;
            }

            return true;
        }, brandName);

        return hasKeywordInContent;
    } catch (e) {
        console.error(`  ⚠️ Verification failed for ${url}:`, e.message);
        return false;
    }
}

async function runAutonomousCollector() {
    console.log('--- 🤖 Autonomous Brand Collector Starting ---');

    // 1. 調査対象のブランドを取得（引数があれば特定、なければ全件）
    const targetBrandSlug = process.argv[2];
    let query = supabase.from('brands').select('*');
    if (targetBrandSlug) {
        query = query.eq('slug', targetBrandSlug);
        console.log(`🎯 Targeting specific brand: ${targetBrandSlug}`);
    }
    const { data: brands, error: brandError } = await query;
    if (brandError) throw brandError;

    // 2. ブラウザを起動（Stealthモード）
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
        locale: 'ja-JP',
        timezoneId: 'Asia/Tokyo'
    });
    const page = await context.newPage();

    for (const brand of brands) {
        console.log(`\n🔎 Investigating Brand: [${brand.name}]`);

        const { data: shops } = await supabase.from('shops').select('id, name, slug');

        for (const shop of shops) {
            const rule = SHOP_RULES[shop.slug];
            if (!rule) continue;

            // --- DEVELOVER DEMO: Fallback slugs if column is missing ---
            const HARDCODED_FALLBACKS = {
                'fear-of-god-essentials': ['essentials', 'fear-of-god'],
                'the-north-face': ['the-north-face-co', 'tnf'],
                'patagonia': ['patagonia-inc']
            };

            // マルチスラッグ検索の実行
            const slugsToTry = [brand.slug, ...(brand.search_slugs || []), ...(HARDCODED_FALLBACKS[brand.slug] || [])];
            let foundUrl = null;

            for (const s of slugsToTry) {
                const targetUrl = rule(s);
                const isFound = await verifyBrandPage(page, targetUrl, brand.name);
                if (isFound) {
                    foundUrl = targetUrl;
                    break;
                }
            }

            if (foundUrl) {
                console.log(`  ✅ FOUND on ${shop.name} (URL: ${foundUrl})`);
                await supabase.from('shop_brands').upsert({
                    shop_id: shop.id,
                    brand_id: brand.id,
                    brand_url: foundUrl,
                    status: 'found',
                    last_checked_at: new Date().toISOString()
                }, { onConflict: 'shop_id, brand_id' });
            } else {
                console.log(`  ❌ NOT FOUND on ${shop.name} (tried ${slugsToTry.length} slugs)`);
                await supabase.from('shop_brands').upsert({
                    shop_id: shop.id,
                    brand_id: brand.id,
                    status: 'not_found',
                    last_checked_at: new Date().toISOString()
                }, { onConflict: 'shop_id, brand_id' });
            }

            // 人間味のある待機時間（2〜5秒のランダム）
            await delay(Math.floor(Math.random() * 3000) + 2000);
        }
    }

    await browser.close();
    console.log('\n--- ✅ Collection Cycle Completed ---');
}

runAutonomousCollector().catch(console.error);
