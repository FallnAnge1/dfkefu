const fs = require('fs');
let content = fs.readFileSync('C:/Users/DFAI/Desktop/dfkefu_new/index.html', 'utf8');

// Make the business section p text bolder
content = content.replace(
  '<p>我们提供专业的电商客服外包服务，覆盖淘宝，天猫、京东、拼多多、抖音、快手等主流电商平台。客服团队经严格培训，持证上岗，7×24小时全年无休，为您的店铺提供高转化、高质量的客户服务体验。</p>',
  '<p style="font-weight:600;">我们提供专业的电商客服外包服务，覆盖淘宝，天猫、京东、拼多多、抖音、快手等主流电商平台。客服团队经严格培训，持证上岗，7×24小时全年无休，为您的店铺提供高转化、高质量的客户服务体验。</p>'
);

fs.writeFileSync('C:/Users/DFAI/Desktop/dfkefu_new/index.html', content, 'utf8');
console.log('Done');
