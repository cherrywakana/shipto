const fs = require('fs');
const path = require('path');

function replaceMarkdownBold() {
  const filePath = path.resolve(__dirname, '../tmp/publish-newera-article.js');
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace all **text** with <strong>text</strong>
  const updatedContent = content.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  
  fs.writeFileSync(filePath, updatedContent);
  console.log('Successfully replaced all ** with <strong> tags in publish-newera-article.js');
}

replaceMarkdownBold();
