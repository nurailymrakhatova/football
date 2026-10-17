// Browser checks for the assignment's real user flows. Run with: npm test
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const results = [];
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.jpg': 'image/jpeg' };
const server = http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const file = path.resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`);
    if (!file.startsWith(root + path.sep)) throw new Error('Invalid path');
    const data = await fs.readFile(file);
    response.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' });
    response.end(data);
  } catch {
    response.writeHead(404);
    response.end('Not found');
  }
});

async function main() {
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {})
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const browserErrors = [];
  page.on('pageerror', (error) => browserErrors.push(error.message));
  const requests = [];
  page.on('request', (request) => requests.push(request.url()));
  const fill = async (values) => {
    for (const [id, value] of Object.entries(values)) await page.locator(`#${id}`).fill(value);
  };
  const contact = { 'full-name': 'Sample Fan', email: 'fan@example.com', question: 'Can I visit the stadium museum?' };
  const registration = {
    'first-name': 'Sample', 'last-name': 'Fan', 'registration-email': 'fan@example.com',
    password: 'Madrid123!', 'confirm-password': 'Madrid123!'
  };
  const submit = () => page.locator('button[type="submit"]').click();
  const reset = () => page.locator('button[type="reset"]').click();
  const countInvalid = () => page.locator('.is-invalid').count();
  const invalid = async (id) => assert.equal(await page.locator(`#${id}`).getAttribute('aria-invalid'), 'true');
  const success = async (id) => assert.match(await page.locator(`#${id}-success`).innerText(), /successful/);
  const screenshot = async (name, selector) => {
    if (process.env.UPDATE_EVIDENCE !== '1') return;
    await fs.mkdir(path.join(root, 'docs/screenshots'), { recursive: true });
    await page.locator(selector).screenshot({ path: path.join(root, 'docs/screenshots', `${name}.png`) });
  };
  async function test(name, action) {
    try {
      await action();
      results.push({ name, result: 'PASS' });
      console.log(`PASS ${name}`);
    } catch (error) {
      results.push({ name, result: 'FAIL', error: error.message });
      console.error(`FAIL ${name}: ${error.message}`);
    }
  }

  try {
    await test('Contact: empty required fields prevent submission and focus the first error', async () => {
      await page.goto(`${base}/stadium.html#visit-form`);
      assert.equal(await countInvalid(), 0);
      await submit();
      assert.equal(await countInvalid(), 3);
      assert.equal(await page.locator('#full-name-error').isVisible(), true);
      assert.equal(await page.locator('#email-error').isVisible(), true);
      assert.equal(await page.locator('#question-error').isVisible(), true);
      assert.equal(await page.locator(':focus').getAttribute('id'), 'full-name');
      assert.equal(await page.locator('#contact-success').textContent(), '');
      await screenshot('contact-invalid-desktop', '#visit-form');
    });
    await test('Contact: one-character name, invalid email and short message are rejected', async () => {
      await fill({ 'full-name': 'A', email: 'not-an-email', question: 'Too short' });
      await submit();
      assert.equal(await countInvalid(), 3);
    });
    await test('Contact: messages of 10 and 500 characters pass; 501 is rejected', async () => {
      await fill({ ...contact, question: 'a'.repeat(10) });
      await submit();
      await success('contact');
      await page.locator('#question').fill('a'.repeat(500));
      await submit();
      await success('contact');
      // Simulate a script bypassing maxlength: the submit handler still checks it.
      await page.locator('#question').evaluate((field) => {
        field.value = 'a'.repeat(501);
        field.dispatchEvent(new Event('input', { bubbles: true }));
      });
      await submit();
      await invalid('question');
      assert.equal(await page.locator('#contact-success').textContent(), '');
    });
    await test('Contact: native maxlength prevents typing a 501st character', async () => {
      await page.locator('#question').fill('a'.repeat(500));
      await page.locator('#question').press('End');
      await page.locator('#question').pressSequentially('b');
      assert.equal((await page.locator('#question').inputValue()).length, 500);
    });
    await test('Contact: whitespace-only name and message are rejected', async () => {
      await fill({ ...contact, 'full-name': '  ', question: '          ' });
      await submit();
      await invalid('full-name');
      await invalid('question');
    });
    await test('Contact: valid sample data shows success without transmitting values', async () => {
      await fill(contact);
      const url = page.url();
      const requestCount = requests.length;
      await submit();
      await success('contact');
      assert.equal(await countInvalid(), 0);
      assert.equal(await page.locator('#contact-form .valid-feedback:visible').count(), 3);
      assert.equal(await page.locator('#contact-form .invalid-feedback:visible').count(), 0);
      assert.equal(page.url(), url);
      assert.equal(requests.length, requestCount);
      assert.equal(await page.evaluate(() => localStorage.length + sessionStorage.length), 0);
      await screenshot('contact-valid-desktop', '#visit-form');
    });
    await test('Contact: reset clears data, success and validation feedback', async () => {
      await reset();
      assert.equal(await page.locator('#full-name').inputValue(), '');
      assert.equal(await page.locator('#question').inputValue(), '');
      assert.equal(await page.locator('.is-valid, .is-invalid').count(), 0);
      assert.equal(await page.locator('#contact-success').textContent(), '');
    });
    await test('Registration: all six required fields reject empty input', async () => {
      await page.goto(`${base}/register.html`);
      await submit();
      assert.equal(await countInvalid(), 6);
      assert.equal(await page.locator('#registration-success').textContent(), '');
      await screenshot('registration-invalid-desktop', '#registration');
    });
    await test('Registration: short names, invalid email and short passwords are rejected', async () => {
      await fill({ 'first-name': 'A', 'last-name': 'B', 'registration-email': 'invalid', password: '1234567', 'confirm-password': '1234567' });
      await page.locator('#country').selectOption('Kazakhstan');
      await submit();
      assert.equal(await countInvalid(), 5);
    });
    await test('Registration: password mismatch updates when either password changes', async () => {
      await fill({ ...registration, 'confirm-password': 'Different123!' });
      await submit();
      await invalid('confirm-password');
      assert.match(await page.locator('#confirm-password-error').textContent(), /must match/);
      assert.equal(await page.locator('#confirm-password-error').isVisible(), true);
      await page.locator('#confirm-password').fill('Madrid123!');
      assert.equal(await page.locator('#confirm-password').getAttribute('aria-invalid'), 'false');
      assert.equal(await page.locator('#confirm-password-error').textContent(), '');
      assert.equal(await page.locator('#confirm-password-error').isVisible(), false);
      await page.locator('#password').fill('Changed123!');
      await invalid('confirm-password');
    });
    await test('Registration: empty country blocks an otherwise valid form', async () => {
      await fill(registration);
      await page.locator('#country').selectOption('');
      await submit();
      assert.equal(await countInvalid(), 1);
      await invalid('country');
    });
    await test('Registration: valid required values pass with optional groups empty', async () => {
      await page.locator('#country').selectOption('Kazakhstan');
      const url = page.url();
      const requestCount = requests.length;
      await submit();
      await success('registration');
      assert.equal(await countInvalid(), 0);
      assert.equal(await page.locator('input[type="radio"]:checked, input[type="checkbox"]:checked').count(), 0);
      assert.equal(page.url(), url);
      assert.equal(requests.length, requestCount);
      assert.equal(await page.evaluate(() => localStorage.length + sessionStorage.length), 0);
    });
    await test('Registration: optional choices work and editing clears stale success', async () => {
      await page.locator('#gender-unspecified').check();
      await page.locator('#interest-matches').check();
      await page.locator('#interest-history').check();
      assert.equal(await page.locator('#registration-success').textContent(), '');
      await submit();
      await success('registration');
      await screenshot('registration-valid-desktop', '#registration');
    });
    await test('Registration: reset after errors clears values, selections and custom validity', async () => {
      await page.locator('#confirm-password').fill('Mismatch123!');
      await submit();
      await invalid('confirm-password');
      await reset();
      assert.equal(await page.locator('.is-valid, .is-invalid, [aria-invalid]').count(), 0);
      assert.equal(await page.locator('.valid-feedback:visible, .invalid-feedback:visible').count(), 0);
      assert.equal(await page.locator('#registration-errors').textContent(), '');
      assert.equal(await page.locator('#registration-success').textContent(), '');
      assert.equal(await page.locator('#country').inputValue(), '');
      assert.equal(await page.locator('#password').inputValue(), '');
      assert.equal(await page.locator('input:checked').count(), 0);
      assert.equal(await page.locator('#confirm-password').evaluate((field) => field.validity.customError), false);
      await fill(registration);
      await page.locator('#country').selectOption('Spain');
      await submit();
      await success('registration');
    });
    await test('Forms: labels, IDs, helper/error references and meaningful names are connected', async () => {
      for (const file of ['stadium.html', 'register.html']) {
        await page.goto(`${base}/${file}`);
        const issues = await page.evaluate(() => {
          const issues = [];
          const ids = Array.from(document.querySelectorAll('[id]'), (el) => el.id);
          if (new Set(ids).size !== ids.length) issues.push('Duplicate IDs');
          document.querySelectorAll('form input, form textarea, form select').forEach((field) => {
            if (!field.name || !field.id || !field.labels.length) issues.push('Unlabelled or unnamed control');
            for (const id of (field.getAttribute('aria-describedby') || '').split(' ').filter(Boolean)) {
              if (!document.getElementById(id)) issues.push(`Missing description ${id}`);
            }
          });
          return issues;
        });
        assert.deepEqual(issues, []);
      }
    });
    await test('Responsive layout: all pages fit 320, 375, 768 and 1440 px viewports', async () => {
      for (const width of [320, 375, 768, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        for (const file of ['index.html', 'team.html', 'history.html', 'stadium.html', 'register.html']) {
          await page.goto(`${base}/${file}`);
          assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${file} overflows at ${width}px`);
        }
        const first = await page.locator('#first-name').boundingBox();
        const last = await page.locator('#last-name').boundingBox();
        if (width < 768) assert.ok(last.y > first.y, 'Names should stack on mobile');
        else assert.equal(first.y, last.y, 'Names should share a row on desktop');
      }
    });
    await test('Mobile: contact and registration remain usable with validation feedback', async () => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(`${base}/stadium.html#visit-form`);
      await fill({ ...contact, email: 'invalid' });
      await submit();
      await invalid('email');
      await screenshot('contact-mobile', '#visit-form');
      await page.goto(`${base}/register.html`);
      await fill(registration);
      await page.locator('#country').selectOption('Kazakhstan');
      await submit();
      await success('registration');
      await screenshot('registration-mobile', '#registration');
    });
    await test('No JavaScript: submit stays disabled so demo values are not put in a URL', async () => {
      const context = await browser.newContext({ javaScriptEnabled: false });
      const noJS = await context.newPage();
      for (const file of ['stadium.html', 'register.html']) {
        await noJS.goto(`${base}/${file}`);
        assert.equal(await noJS.locator('[type="submit"]').isDisabled(), true);
        assert.equal(await noJS.locator('noscript').isVisible(), true);
        const url = noJS.url();
        await noJS.locator('input[type="email"]').fill('sample@example.com');
        await noJS.locator('input[type="email"]').press('Enter');
        assert.equal(noJS.url(), url);
      }
      await context.close();
    });
    await test('No JavaScript runtime errors occurred during the browser tests', async () => {
      assert.deepEqual(browserErrors, []);
    });
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
    await fs.mkdir(path.join(root, 'test-results'), { recursive: true });
    await fs.writeFile(path.join(root, 'test-results/results.json'), JSON.stringify(results, null, 2));
  }
  const failures = results.filter((result) => result.result === 'FAIL');
  console.log(`${results.length - failures.length}/${results.length} checks passed`);
  if (failures.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  server.close();
  process.exitCode = 1;
});
