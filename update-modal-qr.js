const fs = require('fs');
let content = fs.readFileSync('C:/Users/DFAI/Desktop/dfkefu_new/index.html', 'utf8');

// Update modal QR codes
const oldModalQR = `<div style="text-align:center;">
            <img src="./wechat-qr-clean.jpg" alt="企业微信二维码" style="width:220px; border-radius:16px; margin-bottom:20px; box-shadow:0 8px 32px rgba(79,70,229,0.2);">
        </div>`;

const newModalQR = `<div style="text-align:center; display:flex; gap:16px; justify-content:center; margin-bottom:20px;">
            <img src="./wechat-qr-clean.jpg" alt="企业微信二维码" style="width:160px; border-radius:12px; box-shadow:0 4px 16px rgba(79,70,229,0.2);">
            <img src="./modal-qr2.jpg" alt="企业微信二维码" style="width:160px; border-radius:12px; box-shadow:0 4px 16px rgba(79,70,229,0.2);">
        </div>`;

content = content.replace(oldModalQR, newModalQR);

fs.writeFileSync('C:/Users/DFAI/Desktop/dfkefu_new/index.html', content, 'utf8');
console.log('Done');
