import { test, expect } from '@playwright/test';

test('Practice Form', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.locator('.card-body:has-text("Forms")').click();
  await page.getByText('Practice Form', { exact: true }).click();
  await page.fill('#firstName', 'Jacob');
  await page.fill('#lastName', 'Motsweni');
  await page.fill('#userEmail', 'jacob@gmail.com');
  await page.getByText('Male', { exact: true }).click();
  await page.fill('#userNumber', '1234567788');
  await page.fill('#currentAddress', '1001 Block WW');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#example-modal-sizes-title-lg')).toBeVisible();
});

test.only('Browser Windows', async ({ page }) => {
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

