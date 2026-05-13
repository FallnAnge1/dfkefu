const fs = require('fs');
const c = fs.readFileSync('C:/Users/DFAI/Desktop/dfkefu_new/index.html', 'utf8');
const idx = c.indexOf('<!-- 联系方式弹窗 -->');
const end = c.indexOf('</div>\n\n<script>', idx);
console.log(c.substring(idx, end + 7));
