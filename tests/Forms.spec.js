import { test, expect } from '@playwright/test';

test('Practice Form', async ({ page }) => {
  await page.goto('https://demoqa.com/practice-form', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'form-debug.png', fullPage: true });
});