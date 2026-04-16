const fs = require('fs');
let content = fs.readFileSync('C:/Users/DFAI/Desktop/dfkefu_new/honors.html', 'utf8');

// Add floating home button CSS before .footer
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

// Add button HTML after </header>
const btnHTML = `
    <!-- 悬浮回到主页按钮 -->
    <a href="/" class="floating-home-btn" title="回到主页">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
    </a>
`;

// Add CSS before .footer
if (!content.includes('.floating-home-btn')) {
  content = content.replace('        .footer {', btnCSS + '\n\n        .footer {');
}

// Add button HTML after </header>
if (!content.includes('floating-home-btn') || !content.match(/<a href="\/" class="floating-home-btn"/)) {
  content = content.replace('    </header>', '    </header>\n' + btnHTML);
}

fs.writeFileSync('C:/Users/DFAI/Desktop/dfkefu_new/honors.html', content, 'utf8');
console.log('Done');
