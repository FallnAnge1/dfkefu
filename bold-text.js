const fs = require('fs');
let content = fs.readFileSync('C:/Users/DFAI/Desktop/dfkefu_new/index.html', 'utf8');

// Make body text bolder
content = content.replace(
  'body { font-family: "Inter", "PingFang SC", "Microsoft YaHei", sans-serif; color: #333; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #bfdbfe 100%); background-attachment: fixed; line-height: 1.6; overflow-x: hidden; min-height: 100vh; }',
  'body { font-family: "Inter", "PingFang SC", "Microsoft YaHei", sans-serif; color: #333; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #bfdbfe 100%); background-attachment: fixed; line-height: 1.6; overflow-x: hidden; min-height: 100vh; font-weight: 500; }'
);

fs.writeFileSync('C:/Users/DFAI/Desktop/dfkefu_new/index.html', content, 'utf8');
console.log('Done');
