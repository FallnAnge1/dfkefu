const fs = require('fs');
let content = fs.readFileSync('C:/Users/DFAI/Desktop/dfkefu_new/index.html', 'utf8');

// Add the new phone number
content = content.replace(
  '<p>📞 联系电话：15169203040</p>',
  '<p>📞 联系电话：15169203040</p>\n            <p>📞 联系电话：15264359685</p>'
);

fs.writeFileSync('C:/Users/DFAI/Desktop/dfkefu_new/index.html', content, 'utf8');
console.log('Done');
