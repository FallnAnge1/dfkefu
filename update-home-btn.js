const fs = require('fs');
const files = ['about.html', 'news.html', 'cases.html', 'honors.html', 'how-to-cooperate.html'];

// New green home button style
const newBtnCSS = `
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

// New button HTML with SVG house icon
const newBtnHTML = `    <!-- 悬浮回到主页按钮 -->
    <a href="/" class="floating-home-btn" title="回到主页">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
    </a>
`;

files.forEach(f => {
  const path = 'C:/Users/DFAI/Desktop/dfkefu_new/' + f;
  let content = fs.readFileSync(path, 'utf8');
  
  // Replace old floating home button CSS
  if (content.includes('.floating-home-btn')) {
    content = content.replace(/        \/\* 悬浮回到主页按钮 \*\/\s*\.floating-home-btn[\s\S]*?\.floating-home-btn svg[\s\S]*?\n/);
  }
  
  // Add new CSS before .footer
  if (!content.includes('.floating-home-btn')) {
    content = content.replace('        /* 页脚 */', newBtnCSS + '\n\n        /* 页脚 */');
  }
  
  // Replace old button HTML
  const oldBtnRegex = /    <!-- 悬浮回到主页按钮 -->[\s\S]*?<\/a>\n/;
  if (oldBtnRegex.test(content)) {
    content = content.replace(oldBtnRegex, newBtnHTML);
  } else if (content.includes('</header>')) {
    content = content.replace('    </header>', '    </header>\n\n' + newBtnHTML);
  }
  
  fs.writeFileSync(path, content, 'utf8');
  console.log('Updated: ' + f);
});
