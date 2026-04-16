const fs = require('fs');
let content = fs.readFileSync('C:/Users/DFAI/Desktop/dfkefu_new/how-to-cooperate.html', 'utf8');

// Replace old back-btn CSS with new floating-home-btn CSS
const oldBackBtnCSS = `        /* 返回按钮 */
        .back-btn {
            position: fixed; bottom: 30px; right: 30px;
            width: 50px; height: 50px; border-radius: 50%;
            background: linear-gradient(135deg, #10b981, #059669);
            color: #fff; display: flex; align-items: center; justify-content: center;
            font-size: 24px; text-decoration: none; box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4);
            transition: all 0.3s; z-index: 100;
        }
        .back-btn:hover { transform: scale(1.1); }`;

const newFloatingBtnCSS = `        /* 悬浮回到主页按钮 */
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
        .floating-home-btn svg { width: 26px; height: 26px; fill: #fff; }`;

if (content.includes('.back-btn')) {
  content = content.replace(oldBackBtnCSS, newFloatingBtnCSS);
  console.log('Replaced back-btn with floating-home-btn CSS');
} else if (content.includes('.floating-home-btn')) {
  console.log('floating-home-btn CSS already exists');
} else {
  console.log('No back-btn or floating-home-btn CSS found');
}

// Also update the button HTML class from back-btn to floating-home-btn
content = content.replace(/class="back-btn"/g, 'class="floating-home-btn"');

fs.writeFileSync('C:/Users/DFAI/Desktop/dfkefu_new/how-to-cooperate.html', content, 'utf8');
console.log('Done');
