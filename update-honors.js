const fs = require('fs');
let content = fs.readFileSync('C:/Users/DFAI/Desktop/dfkefu_new/honors.html', 'utf8');

// Update header CSS
content = content.replace(/\.header-logo\s*\{[^}]+\}/, '.logo-area { display: flex; align-items: center; gap: 10px; }');
content = content.replace(/\.header-logo img\s*\{[^}]+\}/, '.logo-area img { height: 40px; width: 40px; object-fit: contain; border-radius: 8px; }');
content = content.replace(/\.header-logo-text\s*\{[^}]+\}/, '.logo-text { font-size: 18px; font-weight: 700; color: #fff; }\n        .logo-sub { font-size: 11px; color: rgba(255,255,255,0.6); letter-spacing: 1px; }');

// Update header HTML
content = content.replace(
  /<div class="header-logo">\s*<img src="\.\/dianfeng-logo\.jpg" alt="巅峰网络">\s*<span class="header-logo-text">山东巅峰网络科技<\/span>\s*<\/div>/,
  `<a href="/" class="logo-area">
            <img src="./dianfeng-logo.jpg" alt="巅峰网络">
            <div>
                <div class="logo-text">山东巅峰网络科技</div>
                <div class="logo-sub">DianFeng Network</div>
            </div>
        </a>`
);

fs.writeFileSync('C:/Users/DFAI/Desktop/dfkefu_new/honors.html', content, 'utf8');
console.log('Updated honors.html');
