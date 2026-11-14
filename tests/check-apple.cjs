const fs = require('fs');
const assert = require('assert');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('public/work/index.html','utf8');
const dom = new JSDOM(html, {runScripts:'outside-only', url:'https://example.com/work/'});
const {window:w} = dom;
const headScript = [...w.document.scripts].find(s => s.textContent.includes('__themeIsDark')).textContent;
w.eval(headScript);
const RealDate = w.Date;
for (const [iso,dark] of [['2026-11-14T22:59:00Z',true],['2026-11-14T23:00:00Z',false],['2026-11-14T10:59:00Z',false],['2026-11-14T11:00:00Z',true]]) {
 w.Date = class extends RealDate { constructor(...args) { super(...(args.length ? args : [iso])); } };
 assert.equal(w.__themeIsDark(),dark,iso);
}
w.Date = RealDate;
w.eval(fs.readFileSync('source/js/portfolio-filter.js','utf8'));
w.eval(fs.readFileSync('source/js/theme-switch.js','utf8'));
w.eval(fs.readFileSync('source/js/footer.js','utf8'));
w.document.dispatchEvent(new w.Event('DOMContentLoaded'));
const buttons = [...w.document.querySelectorAll('[data-filter]')];
const cards = [...w.document.querySelectorAll('[data-category]')];
assert(cards.length > 0);
for (const button of buttons) {
 button.click();
 assert(cards.every(c => c.hidden === (!!button.dataset.filter && c.dataset.category !== button.dataset.filter)));
 assert.equal(button.getAttribute('aria-pressed'),'true');
}
assert.equal(cards.filter(c=>!c.hidden).length,Number(buttons.at(-1).querySelector('.tag-btn-count').textContent));
buttons[0].click(); assert(cards.every(c=>!c.hidden));
const toggle=w.document.getElementById('theme-toggle');
assert.equal(toggle.querySelector('.theme-label'),null);
for(let i=0;i<4;i++) {
 const mode=w.document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
 toggle.click(); assert.equal(w.localStorage.getItem('theme-mode'),mode);
 assert.equal(w.document.documentElement.dataset.theme,mode);
}
assert(w.document.querySelector('.footer-link[href="https://hexo.io/zh-cn/"]'));
assert(w.document.querySelector('.footer-link[href="https://github.com/zoeingwingkei/frame"]'));
assert.equal(w.document.querySelectorAll('.logo-img').length,1);
assert(!html.includes('Apple 定制'));
w.matchMedia = () => ({addEventListener() {}});
w.eval(fs.readFileSync('source/js/navigation.js','utf8'));
const menu=w.document.getElementById('menu-btn');
menu.click(); assert.equal(menu.getAttribute('aria-expanded'),'true');
w.document.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape'}));
assert.equal(menu.getAttribute('aria-expanded'),'false');
assert.equal(w.document.querySelector('.footer-link').target,'_blank');
assert.equal(w.document.querySelector('.menu-item a').target,'');
const home = new JSDOM(fs.readFileSync('public/index.html','utf8'));
assert.equal([...home.window.document.querySelectorAll('.hero-link')].find(a=>a.textContent.includes('查看作品')).getAttribute('href'),'/work/');
home.window.close();
assert(/^\d{2}:\d{2}:\d{2}$/.test(w.document.getElementById('footer-clock').textContent));
assert(w.document.querySelector('.footer-col-end .footer-meta'));
console.log('Passed: Beijing boundaries, mode toggle, category filters, clock and copyright position.');
w.close();

