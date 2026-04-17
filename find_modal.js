const fs = require('fs');
const c = fs.readFileSync('C:/Users/DFAI/Desktop/dfkefu_new/index.html', 'utf8');
const idx = c.indexOf('style="display:none; position:fixed; inset:0; z-index:9999');
const end = c.indexOf('</div>', idx);
console.log(c.substring(idx - 50, end + 7));
