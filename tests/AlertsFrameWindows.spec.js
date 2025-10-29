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

  // Simple alert
  page.once('dialog', dialog => dialog.dismiss());
  await page.locator('#alertButton').click();

  // Timer alert (appears after 5 sec)
  page.once('dialog', dialog => dialog.dismiss());
  await page.locator('#timerAlertButton').click();
  await page.waitForTimeout(6000); // wait for dialog to appear and be handled

  // Confirm alert
  page.once('dialog', dialog => dialog.dismiss());
  await page.locator('#confirmButton').click();

  // Prompt alert
  page.once('dialog', dialog => dialog.accept('Testing input'));
  await page.locator('#promtButton').click();
});

test('Nested Frames', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByText('Alerts, Frame & Windows', { exact: true }).click();
  await page.getByText('Nested Frames', { exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Nested Frames' })).toBeVisible();
});

test.only('Modal Dialogs', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByText('Alerts, Frame & Windows', { exact: true }).click();
  await page.getByText('Modal Dialogs', { exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Modal Dialogs' })).toBeVisible();
});



