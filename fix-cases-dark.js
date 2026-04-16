const fs = require('fs');
let content = fs.readFileSync('C:/Users/DFAI/Desktop/dfkefu_new/cases.html', 'utf8');

// Update dark backgrounds to light purple/blue
content = content.replace(
  'background: linear-gradient(180deg, #0a1f1c 0%, #0f2a25 100%);',
  'background: linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #6d28d9 100%);'
);

content = content.replace(
  'background: linear-gradient(180deg, #0f2a25 0%, #0a1f1c 50%, #081a15 100%);',
  'background: linear-gradient(135deg, #4c1d95 0%, #6d28d9 100%);'
);

// Update footer dark background
content = content.replace(
  'background: #050f0d; color: rgba(255,255,255,0.5);',
  'background: #0f0e2a; color: rgba(255,255,255,0.65);'
);

fs.writeFileSync('C:/Users/DFAI/Desktop/dfkefu_new/cases.html', content, 'utf8');
console.log('Done');
