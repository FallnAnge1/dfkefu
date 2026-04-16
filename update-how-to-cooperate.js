const fs = require('fs');
let content = fs.readFileSync('C:/Users/DFAI/Desktop/dfkefu_new/how-to-cooperate.html', 'utf8');

// Update header background
content = content.replace(
  /background:\s*rgba\(15,\s*26,\s*15,\s*0\.95\);\s*backdrop-filter:\s*blur\(20px\);\s*border-bottom:\s*1px\s*solid\s*rgba\(16,\s*185,\s*129,\s*0\.2\);/,
  'background: linear-gradient(135deg, #1e1b4b 0%, #2d2a5a 50%, #312e81 100%); border-bottom: 1px solid rgba(99, 102, 241, 0.3);'
);

// Update logo styles
content = content.replace(
  /\.logo-area\s*\{[^}]+\}/,
  '.logo-area { display: flex; align-items: center; gap: 10px; }'
);

content = content.replace(
  /\.logo-img\s*\{[^}]+\}/,
  '.logo-img { width: 40px; height: 40px; background: linear-gradient(135deg, #4f46e5, #7c3aed); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 16px; font-weight: 800; }'
);

content = content.replace(
  /\.logo-text\s*\{[^}]+\}/,
  '.logo-text { font-size: 18px; font-weight: 800; color: #fff; }'
);

// Change .nav to .header-nav and update styles
content = content.replace(/\.nav\s*\{[^}]+\}/, '.header-nav { display: flex; gap: 32px; }');
content = content.replace(/\.nav a\s*\{[^}]+\}/, '.header-nav a { color: rgba(255,255,255,0.7); text-decoration: none; font-size: 17px; font-weight: 600; transition: color 0.3s; }');
content = content.replace(/\.nav a:hover,\s*\.nav a\.active\s*\{[^}]+\}/, '.header-nav a:hover, .header-nav a.active { color: #fff; }');
content = content.replace(/\.nav a\.active\s*\{[^}]+\}/, '');

// Update page title gradient
content = content.replace(
  /background:\s*linear-gradient\(135deg,\s*#fff,\s*#10b981\);/,
  'background: linear-gradient(135deg, #1e1b4b, #4f46e5);'
);

// Update timeline color
content = content.replace(
  /background:\s*linear-gradient\(180deg,\s*#10b981,\s*#059669,\s*#10b981\);/,
  'background: linear-gradient(180deg, #4f46e5, #7c3aed, #4f46e5);'
);

// Update step number gradient
content = content.replace(
  /background:\s*linear-gradient\(135deg,\s*#10b981,\s*#059669\);\s*box-shadow:\s*0\s*0\s*60px\s*rgba\(16,\s*185,\s*129,\s*0\.4\);/,
  'background: linear-gradient(135deg, #4f46e5, #7c3aed); box-shadow: 0 0 60px rgba(79, 70, 229, 0.4);'
);

// Update page subtitle color
content = content.replace(
  /\.page-subtitle\s*\{[^}]+\}/,
  '.page-subtitle { font-size: 20px; color: #6b7280; font-weight: 400; }'
);

// Update step title and desc colors
content = content.replace(/\.step-title\s*\{[^}]+\}/, '.step-title { font-size: 32px; font-weight: 800; margin-bottom: 16px; color: #1e1b4b; }');
content = content.replace(/\.step-desc\s*\{[^}]+\}/, '.step-desc { font-size: 18px; color: #6b7280; margin-bottom: 24px; line-height: 1.8; }');

// Update step detail styles
content = content.replace(
  /background:\s*rgba\(16,\s*185,\s*129,\s*0\.1\);\s*border-radius:\s*12px;\s*border-left:\s*3px\s*solid\s*#10b981;/,
  'background: rgba(99, 102, 241, 0.05); border-radius: 12px; border-left: 3px solid #4f46e5;'
);
content = content.replace(/\.step-detail-text\s*strong\s*\{\s*color:\s*#10b981;\s*\}/, '.step-detail-text strong { color: #4f46e5; }');

// Update CTA colors
content = content.replace(/\.cta-title\s*\{[^}]+\}/, '.cta-title { font-size: 32px; font-weight: 800; margin-bottom: 16px; color: #1e1b4b; }');
content = content.replace(/\.cta-desc\s*\{[^}]+\}/, '.cta-desc { font-size: 18px; color: #6b7280; margin-bottom: 32px; }');
content = content.replace(
  /background:\s*linear-gradient\(135deg,\s*#10b981,\s*#059669\);\s*color:\s*#fff;\s*box-shadow:\s*0\s*8px\s*30px\s*rgba\(16,\s*185,\s*129,\s*0\.4\);/,
  'background: linear-gradient(135deg, #4f46e5, #7c3aed); color: #fff; box-shadow: 0 8px 30px rgba(79, 70, 229, 0.4);'
);
content = content.replace(/\.cta-btn-primary:hover\s*\{[^}]+\}/, '.cta-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(79, 70, 229, 0.5); }');
content = content.replace(
  /background:\s*rgba\(255,\s*255,\s*255,\s*0\.1\);\s*color:\s*#fff;\s*border:\s*1px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.2\);/,
  'background: #fff; color: #4f46e5; border: 1px solid #4f46e5;'
);
content = content.replace(
  /\.cta-btn-secondary:hover\s*\{[^}]+\}/,
  '.cta-btn-secondary:hover { background: rgba(79, 70, 229, 0.05); }'
);

// Update step content background
content = content.replace(
  /background:\s*rgba\(255,\s*255,\s*255,\s*0\.05\);\s*border-radius:\s*24px;\s*padding:\s*40px;\s*border:\s*1px\s*solid\s*rgba\(16,\s*185,\s*129,\s*0\.2\);\s*backdrop-filter:\s*blur\(10px\);/,
  'background: #fff; border-radius: 24px; padding: 40px; border: 1px solid rgba(99, 102, 241, 0.15); box-shadow: 0 4px 24px rgba(0,0,0,0.08);'
);

// Update header HTML - logo
content = content.replace(
  /<a href="\/" class="logo-area">\s*<div class="logo-img">巅<\/div>\s*<span class="logo-text">山东巅峰<\/span>\s*<\/a>/,
  `<a href="/" class="logo-area">
                <img src="./dianfeng-logo.jpg" alt="巅峰网络" style="height:44px;width:44px;object-fit:contain;border-radius:8px;margin-right:4px;">
                <div>
                    <div class="logo-text">山东巅峰网络科技</div>
                    <div class="logo-sub">DianFeng Network</div>
                </div>
            </a>`
);

// Update header HTML - nav class to header-nav
content = content.replace(/<nav class="nav">/g, '<nav class="header-nav">');

// Add logo-sub style
content = content.replace(
  /\.logo-text\s*\{[^}]+\}/,
  '.logo-text { font-size: 18px; font-weight: 800; color: #fff; }\n        .logo-sub { font-size: 11px; color: rgba(255,255,255,0.6); letter-spacing: 1px; }'
);

fs.writeFileSync('C:/Users/DFAI/Desktop/dfkefu_new/how-to-cooperate.html', content, 'utf8');
console.log('Updated how-to-cooperate.html');
