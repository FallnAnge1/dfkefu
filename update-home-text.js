const fs = require('fs');
let content = fs.readFileSync('C:/Users/DFAI/Desktop/dfkefu_new/index.html', 'utf8');

// Update the business section text
const oldText = `<h3>客服外包</h3>
                <div class="sub">全品类全平台专业服务</div>
                <p>我们提供专业的电商客服外包服务，覆盖淘宝、天猫、京东、拼多多、抖音、快手等主流电商平台。客服团队经严格培训，持证上岗，7×24小时全年无休，为您的店铺提供高转化、高质量的客户服务体验。</p>`;

const newText = `<h3>客服外包</h3>
                <div class="sub">全品类全平台专业服务</div>
                <p>我们提供专业的电商客服外包服务，覆盖淘宝，天猫、京东、拼多多、抖音、快手等主流电商平台。客服团队经严格培训，持证上岗，7×24小时全年无休，为您的店铺提供高转化、高质量的客户服务体验。</p>`;

content = content.replace(oldText, newText);

fs.writeFileSync('C:/Users/DFAI/Desktop/dfkefu_new/index.html', content, 'utf8');
console.log('Done');
