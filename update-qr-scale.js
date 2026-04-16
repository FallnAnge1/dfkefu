const fs = require('fs');
let content = fs.readFileSync('C:/Users/DFAI/Desktop/dfkefu_new/index.html', 'utf8');

// Update hover scale from 1.1 to 2
content = content.replace(
  'transform: scale(1.1);',
  'transform: scale(2);'
);

fs.writeFileSync('C:/Users/DFAI/Desktop/dfkefu_new/index.html', content, 'utf8');
console.log('Done');
