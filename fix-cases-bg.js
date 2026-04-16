const fs = require('fs');
let content = fs.readFileSync('C:/Users/DFAI/Desktop/dfkefu_new/cases.html', 'utf8');

// Update body background to match homepage
content = content.replace(
  /body\s*\{[^}]+background:\s*[^;]+;/,
  'body { font-family: "Inter", "PingFang SC", "Microsoft YaHei", sans-serif; color: #333; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #bfdbfe 100%); background-attachment: fixed; line-height: 1.6; min-height: 100vh; }'
);

fs.writeFileSync('C:/Users/DFAI/Desktop/dfkefu_new/cases.html', content, 'utf8');
console.log('Done');
