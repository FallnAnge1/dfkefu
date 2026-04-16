const fs = require('fs');
let content = fs.readFileSync('C:/Users/DFAI/Desktop/dfkefu_new/cases.html', 'utf8');

// Change purple gradients to blue gradients
content = content.replace(
  'background: linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #6d28d9 100%);',
  'background: linear-gradient(135deg, #1e3a5f 0%, #1e5aa8 50%, #1e6db8 100%);'
);

content = content.replace(
  'background: linear-gradient(135deg, #4c1d95 0%, #6d28d9 100%);',
  'background: linear-gradient(135deg, #1e5aa8 0%, #1e6db8 100%);'
);

fs.writeFileSync('C:/Users/DFAI/Desktop/dfkefu_new/cases.html', content, 'utf8');
console.log('Done');
