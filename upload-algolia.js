// upload-algolia.js
const algoliasearch = require('algoliasearch');
const fs = require('fs');

// ⚠️ 建议放到环境变量里（更安全），这里先写死测试
const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID || "I9S3TMXSM0";
const ALGOLIA_ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY || "你的AdminAPIKey";
const ALGOLIA_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME || "blog";

// 初始化客户端
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);

// 读取 Hugo 生成的 JSON
const objects = JSON.parse(fs.readFileSync('./public/algolia.json', 'utf-8'));

// 上传到 Algolia
index
  .saveObjects(objects, { autoGenerateObjectIDIfNotExist: true })
  .then(() => {
    console.log("✅ Algolia index updated successfully!");
  })
  .catch(err => {
    console.error("❌ Upload failed:", err);
  });

