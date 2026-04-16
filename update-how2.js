const fs = require('fs');
let content = fs.readFileSync('C:/Users/DFAI/Desktop/dfkefu_new/how-to-cooperate.html', 'utf8');

// Update step title - bigger and darker
content = content.replace(
  /\.step-title\s*\{[^}]+\}/,
  '.step-title { font-size: 36px; font-weight: 900; margin-bottom: 16px; color: #1e1b4b; }'
);

// Update step desc - bigger and darker
content = content.replace(
  /\.step-desc\s*\{[^}]+\}/,
  '.step-desc { font-size: 20px; color: #374151; margin-bottom: 24px; line-height: 1.8; }'
);

// Update step detail text - bigger and darker
content = content.replace(
  /\.step-detail-text\s*\{[^}]+\}/,
  '.step-detail-text { font-size: 18px; color: #1f2937; line-height: 1.7; }'
);

// Update page subtitle - darker
content = content.replace(
  /\.page-subtitle\s*\{[^}]+\}/,
  '.page-subtitle { font-size: 22px; color: #4b5563; font-weight: 500; }'
);

// Update CTA title - bigger
content = content.replace(
  /\.cta-title\s*\{[^}]+\}/,
  '.cta-title { font-size: 36px; font-weight: 900; margin-bottom: 16px; color: #1e1b4b; }'
);

// Update CTA desc - bigger and darker
content = content.replace(
  /\.cta-desc\s*\{[^}]+\}/,
  '.cta-desc { font-size: 20px; color: #4b5563; margin-bottom: 32px; }'
);

// Update step number - bigger
content = content.replace(
  /\.step-number\s*\{[^}]+\}/,
  '.step-number { width: 130px; height: 130px; border-radius: 50%; flex-shrink: 0; background: linear-gradient(135deg, #4f46e5, #7c3aed); display: flex; align-items: center; justify-content: center; font-size: 56px; font-weight: 900; color: #fff; box-shadow: 0 0 60px rgba(79, 70, 229, 0.4); position: relative; z-index: 2; }'
);

fs.writeFileSync('C:/Users/DFAI/Desktop/dfkefu_new/how-to-cooperate.html', content, 'utf8');
console.log('Updated fonts and colors');
