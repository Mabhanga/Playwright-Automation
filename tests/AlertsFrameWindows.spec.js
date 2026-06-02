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

  const alertBtn = page.locator('#alertButton');
  await alertBtn.waitFor({ state: 'visible', timeout: 5000 });
  await alertBtn.click();

  const timerAlertBtn = page.locator('#timerAlertButton');
  await timerAlertBtn.waitFor({ state: 'visible', timeout: 5000 });
  await timerAlertBtn.click();
  await page.waitForEvent('dialog');

  const confirmBtn = page.locator('#confirmButton');
  await confirmBtn.waitFor({ state: 'visible', timeout: 5000 });
  await confirmBtn.click();

  const promptBtn = page.locator('#promtButton');
  await promptBtn.waitFor({ state: 'visible', timeout: 5000 });
  await promptBtn.click();
});

test('Nested Frames', async ({ page }) => {
  await page.goto('https://demoqa.com/nestedframes');
  
  const parentFrame = page.frameLocator('#frame1');
  await expect(parentFrame.locator('body')).toContainText('Parent frame');
  
  const childFrame = parentFrame.frameLocator('iframe');
  await expect(childFrame.locator('body')).toContainText('Child Iframe');
});

test('Modal Dialogs', async ({ page }) => {
  await page.goto('https://demoqa.com/modal-dialogs');

  // Small modal
  await page.getByRole('button', { name: 'Small Modal' }).click();
  await expect(page.locator('.modal-title')).toContainText('Small Modal');
  await page.locator('#closeSmallModal').click();
  await expect(page.locator('.modal-title')).not.toBeVisible();

  // Large modal
  await page.getByRole('button', { name: 'Large Modal' }).click();
  await expect(page.locator('.modal-title')).toContainText('Large Modal');
  await page.locator('#closeLargeModal').click();
  await expect(page.locator('.modal-title')).not.toBeVisible();
});