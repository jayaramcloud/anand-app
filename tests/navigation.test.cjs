const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, '../public/index.html'), 'utf8');
test('left navigation links to Home, About Us and Contact sections', () => {
  const nav = html.match(/<nav\b[^>]*aria-label="Main navigation"[^>]*>([\s\S]*?)<\/nav>/);
  assert.ok(nav, 'accessible main navigation exists');
  for (const [id, label] of [['home', 'Home'], ['about', 'About Us'], ['contact', 'Contact']]) {
    assert.match(nav[1], new RegExp(`<a[^>]*href="#${id}"[^>]*>\\s*${label}\\s*</a>`));
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.match(html, /Hello from anand!/);
  assert.match(html, /id="greet"/);
  assert.match(html, /id="message"/);
});
