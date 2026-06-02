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