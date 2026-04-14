/**
 * Google Indexing API を使用して URL のインデックス申請を行うスクリプト
 * 
 * 使用方法:
 * node scripts/google_indexing.js https://original-price.com/articles/your-slug
 * 
 * 準備:
 * 1. Google Cloud Console で Indexing API を有効化
 * 2. サービスアカウントを作成し、JSON 鍵をプロジェクト直下に 
 *    `google-indexing-service-account.json` という名前で保存
 * 3. サービスアカウントのメールアドレスを Google Search Console の「オーナー」または「フル」権限で追加
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const KEY_FILE = path.join(__dirname, '../google-indexing-service-account.json');

async function indexUrl(url) {
    if (!url) {
        console.error('❌ URL が指定されていません。');
        process.exit(1);
    }

    if (!fs.existsSync(KEY_FILE)) {
        console.error('❌ サービスアカウントの鍵ファイルが見つかりません: google-indexing-service-account.json');
        console.log('ℹ️  Search Console との連携設定が必要です。詳細はスクリプト内のコメントを確認してください。');
        process.exit(1);
    }

    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: KEY_FILE,
            scopes: ['https://www.googleapis.com/auth/indexing'],
        });

        const client = await auth.getClient();
        const indexing = google.indexing({
            version: 'v3',
            auth: client,
        });

        console.log(`🚀 Google にインデックス申請を送信中: ${url}...`);

        const res = await indexing.urlNotifications.publish({
            requestBody: {
                url: url,
                type: 'URL_UPDATED',
            },
        });

        console.log('✅ 申請成功!');
        console.log('Response:', JSON.stringify(res.data, null, 2));
    } catch (error) {
        console.error('❌ 申請エラー:', error.message);
        if (error.response && error.response.data) {
            console.error('Details:', JSON.stringify(error.response.data, null, 2));
        }
    }
}

// コマンドライン引数からURLを取得
const urlArg = process.argv[2];
indexUrl(urlArg);
