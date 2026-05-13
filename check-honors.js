const fs = require('fs');
const c = fs.readFileSync('C:/Users/DFAI/Desktop/dfkefu_new/honors.html', 'utf8');
const i = c.indexOf('class="nav"');
console.log('Found nav at:', i);
if (i !== -1) {
    console.log(c.substring(i - 50, i + 500));
} else {
    // Check what's there
    const headerIdx = c.indexOf('<header');
    console.log('Header at:', headerIdx);
    console.log(c.substring(headerIdx, headerIdx + 800));
}
