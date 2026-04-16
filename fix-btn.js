const fs = require('fs');
let content = fs.readFileSync('C:/Users/DFAI/Desktop/dfkefu_new/how-to-cooperate.html', 'utf8');

// Check if floating-home-btn CSS exists
if (!content.match(/\.floating-home-btn\s*\{/)) {
  // Add the CSS before .footer
  const btnCSS = `
        /* 悬浮回到主页按钮 */
        .floating-home-btn {
            position: fixed; right: 24px; bottom: 100px; z-index: 999;
            width: 56px; height: 56px; border-radius: 50%;
            background: linear-gradient(135deg, #10b981, #059669);
            display: flex; align-items: center; justify-content: center;
            box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4);
            cursor: pointer; transition: all 0.3s;
            text-decoration: none;
        }
        .floating-home-btn:hover {
            transform: translateY(-4px) scale(1.05);
            box-shadow: 0 8px 30px rgba(16, 185, 129, 0.5);
        }
        .floating-home-btn svg { width: 26px; height: 26px; fill: #fff; }
`;
  content = content.replace('        /* 页脚 */', btnCSS + '\n\n        /* 页脚 */');
  fs.writeFileSync('C:/Users/DFAI/Desktop/dfkefu_new/how-to-cooperate.html', content, 'utf8');
  console.log('Added missing CSS');
} else {
  console.log('CSS already exists');
}
