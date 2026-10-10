const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, '../public/index.html'), 'utf8');
test('About Us presents technical and soft skills course lists', () => {
  const about = html.match(/<section id="about"[^>]*>([\s\S]*?)<\/section>/)[1];
  for (const heading of ['Technical Courses', 'Soft Skills Courses']) assert.ok(about.includes(heading));
  const lists = [...about.matchAll(/<ul[^>]*>([\s\S]*?)<\/ul>/g)];
  assert.equal(lists.length, 2);
  for (const list of lists) assert.equal([...list[1].matchAll(/<li>/g)].length, 6);
  for (const title of ['Python Programming', 'Java Programming', 'Web Development', 'SQL and Database Fundamentals', 'Cloud Computing Fundamentals', 'Software Testing and Quality Assurance', 'Business Communication', 'Teamwork and Collaboration', 'Leadership Skills', 'Time Management', 'Problem-Solving and Critical Thinking', 'Interview Preparation and Presentation Skills']) assert.ok(about.includes(title), title);
  assert.match(about, /href="#contact"/);
});
test('Contact displays the supplied email link and postal address exactly', () => {
  const contact = html.match(/<section id="contact"[^>]*>([\s\S]*?)<\/section>/)[1];
  assert.match(contact, /href="mailto:Test\.Preparation@test\.com"[^>]*>Test\.Preparation@test\.com<\/a>/);
  assert.ok(contact.includes('1234 Sandalia Ct Katy TX 77494'));
});
test('Home introduces software services and links visitors to Contact', () => {
  const home = html.match(/<header id="home">([\s\S]*?)<\/header>/)[1];
  assert.match(home, /Software services/);
  for (const service of ['Custom software development', 'Web and mobile applications', 'Cloud solutions', 'Maintenance and support']) assert.ok(home.includes(service), service);
  assert.match(home, /href="#contact"/);
  assert.doesNotMatch(home, /This is my first website/);
});
test('left navigation links to Home, About Us and Contact sections', () => {
  const nav = html.match(/<nav\b[^>]*aria-label="Main navigation"[^>]*>([\s\S]*?)<\/nav>/);
  assert.ok(nav, 'accessible main navigation exists');
  for (const [id, label] of [['home', 'Home'], ['about', 'About Us'], ['contact', 'Contact']]) {
    assert.match(nav[1], new RegExp(`<a[^>]*href="#${id}"[^>]*>\\s*${label}\\s*</a>`));
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.match(html, /<header id="home">/);
  assert.match(html, /id="greet"/);
  assert.match(html, /id="message"/);
});
