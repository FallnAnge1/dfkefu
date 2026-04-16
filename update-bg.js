const fs = require('fs');
const files = ['about.html', 'news.html', 'cases.html', 'honors.html', 'how-to-cooperate.html'];
const newBg = 'background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #bfdbfe 100%); background-attachment: fixed;';

files.forEach(f => {
  const path = 'C:/Users/DFAI/Desktop/dfkefu_new/' + f;
  let content = fs.readFileSync(path, 'utf8');
  
  // Replace body background - match the body line with various backgrounds
  const oldBodyMatch = content.match(/body\s*\{[^}]+background:[^;]+;[^}]+\}/);
  if (oldBodyMatch) {
    const newBody = oldBodyMatch[0].replace(
      /background:[^;]+;/,
      newBg + ' line-height: 1.6; min-height: 100vh;'
    ).replace(/color:[^;]+;/, 'color: #333;');
    content = content.replace(oldBodyMatch[0], newBody);
    fs.writeFileSync(path, content, 'utf8');
    console.log('Updated: ' + f);
  } else {
    console.log('Not found: ' + f);
  }
});
