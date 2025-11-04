import { test, expect } from '@playwright/test';

test('Browser Windows', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByText('Alerts, Frame & Windows', { exact: true }).click();
  await page.getByText('Browser Windows', { exact: true }).click();

  // New Tab
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'New Tab', exact: true }).click();
  const page1 = await page1Promise;
  await expect(page1).toHaveURL(/sample/);

  // New Window
  const page2Promise = page.waitForEvent('popup');
  await page.locator('#windowButton').click();
  const page2 = await page2Promise;
  await expect(page2).toHaveURL(/sample/);

  // New Window Message
  const page3Promise = page.waitForEvent('popup');
  await page.locator('#messageWindowButton').click();
  const page3 = await page3Promise;
  await expect(page3).toBeTruthy();
});

test('Alerts', async ({ page }) => {
  await page.goto('https://demoqa.com/alerts');
  page.on('dialog', async dialog => {
    if (dialog.type() === 'prompt') {
      await dialog.accept('Testing input'); 
    } else {
      await dialog.dismiss();
    }
  });

  // Simple alert
  const alertBtn = page.locator('#alertButton');
  await alertBtn.waitFor({ state: 'visible', timeout: 5000 });
  await alertBtn.click();

  // Timer alert (appears after a few seconds)
  const timerAlertBtn = page.locator('#timerAlertButton');
  await timerAlertBtn.waitFor({ state: 'visible', timeout: 5000 });
  await timerAlertBtn.click();
  await page.waitForEvent('dialog'); // wait until alert appears

  // Confirm alert
  const confirmBtn = page.locator('#confirmButton');
  await confirmBtn.waitFor({ state: 'visible', timeout: 5000 });
  await confirmBtn.click();

  // Prompt alert
  const promptBtn = page.locator('#promtButton');
  await promptBtn.waitFor({ state: 'visible', timeout: 5000 });
  await promptBtn.click();
});

test('Nested Frames', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByText('Alerts, Frame & Windows', { exact: true }).click();
  await page.getByText('Nested Frames', { exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Nested Frames' })).toBeVisible();
});

test('Modal Dialogs', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByText('Alerts, Frame & Windows', { exact: true }).click();
  await page.getByText('Modal Dialogs', { exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Modal Dialogs' })).toBeVisible();
});



