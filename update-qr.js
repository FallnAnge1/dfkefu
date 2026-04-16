const fs = require('fs');
let content = fs.readFileSync('C:/Users/DFAI/Desktop/dfkefu_new/index.html', 'utf8');

// Update the QR code images with hover effect
const oldQR = `<img src="/enterprise-wechat-qr.jpg" alt="企业微信二维码" style="width:100px; border-radius:8px;">
                <img src="/enterprise-wechat-qr2.jpg" alt="企业微信二维码" style="width:100px; border-radius:8px;">`;

const newQR = `<div class="qr-wrapper">
                    <img src="/enterprise-wechat-qr.jpg" alt="企业微信二维码" class="qr-img">
                </div>
                <div class="qr-wrapper">
                    <img src="/enterprise-wechat-qr2.jpg" alt="企业微信二维码" class="qr-img">
                </div>`;

content = content.replace(oldQR, newQR);

// Add CSS for qr-wrapper and qr-img hover effect
const qrCSS = `
        .qr-wrapper {
            display: inline-block;
            transition: transform 0.3s ease;
        }
        .qr-wrapper:hover {
            transform: scale(1.1);
        }
        .qr-img {
            width: 100px;
            border-radius: 8px;
        }
`;

// Add the CSS before .footer styles
content = content.replace(
  '        .footer {',
  qrCSS + '\n\n        .footer {'
);

fs.writeFileSync('C:/Users/DFAI/Desktop/dfkefu_new/index.html', content, 'utf8');
console.log('Done');
