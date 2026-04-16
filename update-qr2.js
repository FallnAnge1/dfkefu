const fs = require('fs');
let content = fs.readFileSync('C:/Users/DFAI/Desktop/dfkefu_new/index.html', 'utf8');

// Update QR codes with new images, side by side
const oldQR = `<div class="qr-wrapper">
                    <img src="/enterprise-wechat-qr.jpg" alt="企业微信二维码" class="qr-img">
                </div>
                <div class="qr-wrapper">
                    <img src="/enterprise-wechat-qr2.jpg" alt="企业微信二维码" class="qr-img">
                </div>`;

const newQR = `<div style="display:flex; gap:12px; margin-top:8px;">
                    <div class="qr-wrapper">
                        <img src="/qr_new1.jpg" alt="企业微信二维码" class="qr-img">
                    </div>
                    <div class="qr-wrapper">
                        <img src="/qr_new2.jpg" alt="企业微信二维码" class="qr-img">
                    </div>
                </div>`;

content = content.replace(oldQR, newQR);

// Update qr-img to have fixed width for consistency
content = content.replace(
  '.qr-img {',
  '.qr-img { width: 90px;'
);

fs.writeFileSync('C:/Users/DFAI/Desktop/dfkefu_new/index.html', content, 'utf8');
console.log('Done');
