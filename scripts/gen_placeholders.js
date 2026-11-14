const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'source', 'images', 'work');
fs.mkdirSync(outDir, { recursive: true });

const sets = [
  { key: 'main',   label: 'MAIN IMAGE',    c1: '#E9E4DB', c2: '#D5CEC2', n: 3 },
  { key: 'detail', label: 'DETAIL PAGE',   c1: '#DFE3E6', c2: '#C7CFD6', n: 2 },
  { key: 'store',  label: 'STORE VISUAL',  c1: '#E6E1E8', c2: '#D0C8D6', n: 2 },
  { key: 'kv',     label: 'CAMPAIGN KV',   c1: '#EADFD6', c2: '#D9C4B8', n: 2 },
  { key: 'brand',  label: 'BRAND',         c1: '#E2E5DE', c2: '#C9D1C4', n: 2 },
];

function svg(label, c1, c2, idx) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1500" viewBox="0 0 1200 1500">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="1500" fill="url(#g)"/>
  <rect x="60" y="60" width="1080" height="1380" fill="none" stroke="#373633" stroke-opacity="0.10" stroke-width="2"/>
  <text x="100" y="170" font-family="Helvetica, Arial, sans-serif" font-size="38" letter-spacing="6" fill="#373633" fill-opacity="0.42">${label}</text>
  <text x="100" y="1400" font-family="Helvetica, Arial, sans-serif" font-size="200" font-weight="bold" fill="#373633" fill-opacity="0.14">${idx}</text>
</svg>
`;
}

for (const s of sets) {
  for (let i = 1; i <= s.n; i++) {
    const idx = String(i).padStart(2, '0');
    fs.writeFileSync(path.join(outDir, `${s.key}-${idx}.svg`), svg(s.label, s.c1, s.c2, idx), 'utf8');
  }
}

const portrait = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1125" viewBox="0 0 900 1125">
  <defs>
    <linearGradient id="p" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#E8E6E1"/>
      <stop offset="100%" stop-color="#CFCAC1"/>
    </linearGradient>
  </defs>
  <rect width="900" height="1125" fill="url(#p)"/>
  <circle cx="450" cy="430" r="130" fill="#373633" fill-opacity="0.13"/>
  <path d="M210 1050 C210 830 330 720 450 720 C570 720 690 830 690 1050 Z" fill="#373633" fill-opacity="0.13"/>
  <text x="450" y="1085" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="26" letter-spacing="4" fill="#373633" fill-opacity="0.35">PORTRAIT</text>
</svg>
`;
fs.writeFileSync(path.join(root, 'source', 'images', 'portrait.svg'), portrait, 'utf8');

console.log('done');
console.log(fs.readdirSync(outDir).join('\n'));
