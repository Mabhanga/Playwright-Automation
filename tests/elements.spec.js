import { test, expect } from '@playwright/test';

test('TextBox', async ({ page }) => {
    await page.goto('https://demoqa.com/');
    await page.getByRole('img').nth(3).click();
    await page.getByText('Text Box').click();
    await page.getByRole('textbox', { name: 'Full Name' }).fill('jacob');
    await page.getByRole('textbox', { name: 'name@example.com' }).fill('jacob@gmail.com');
    await page.getByRole('textbox', { name: 'Current Address' }).fill('1001 block ww');
    await page.locator('#permanentAddress').fill('1002 block dd');
    await page.getByRole('button', { name: 'Submit' }).click();
});

test('CheckBox', async ({ page }) => {
    await page.goto('https://demoqa.com/');
    await page.getByText('Elements', { exact: true }).click();
    await page.getByText('Check Box', { exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Check Box' })).toBeVisible();
    await page.locator('label[for="tree-node-home"]').click();
    await expect(page.locator('#result')).toBeVisible();
});

test('Radio Button', async ({ page }) => {
    await page.goto('https://demoqa.com/');
    await page.getByText('Elements', { exact: true }).click();
    await page.getByText('Radio Button', { exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Radio Button' })).toBeVisible();
    await page.locator('label[for="yesRadio"]').click();
    await expect(page.getByText('You have selected Yes')).toBeVisible();
});


test('Web Tables', async ({ page }) => {
    await page.goto('https://demoqa.com/');
    await page.getByText('Elements', { exact: true }).click();
    await page.getByText('Web Tables', { exact: true }).click();
    await page.getByRole('button', { name: 'Add' }).click();
    await page.getByRole('textbox', { name: 'First Name' }).waitFor({ state: 'visible' });
    await page.getByRole('textbox', { name: 'First Name' }).fill('Jacob');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Motsweni');
    await page.getByRole('textbox', { name: 'name@example.com' }).fill('jacob@gmail.com');
    await page.getByRole('textbox', { name: 'Age' }).fill('33');
    await page.getByRole('textbox', { name: 'Salary' }).fill('222222');
    await page.getByRole('textbox', { name: 'Department' }).fill('Operations');
    await page.getByRole('button', { name: 'Submit' }).click();
});

test('Buttons', async ({ page }) => {
    await page.goto('https://demoqa.com/');
    await page.getByText('Elements', { exact: true }).click();
    await page.getByText('Buttons', { exact: true }).click();
    await page.getByRole('button', { name: 'Double Click Me' }).dblclick();
    await page.getByRole('button', { name: 'Right Click Me' }).click({ button: 'right' });
    await page.getByRole('button', { name: 'Click Me', exact: true }).click();
    await expect(page.getByText('You have done a dynamic click')).toBeVisible();
});

test('Links', async ({ page }) => {
    await page.goto('https://demoqa.com/');
    await page.getByText('Elements', { exact: true }).click();
    await page.getByText('Links', { exact: true }).click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Home', exact: true }).click();
    const page1 = await page1Promise;
    await expect(page1).toHaveURL('https://demoqa.com/');
});

test('Broken Links', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByText('Elements', { exact: true }).click();
  await page.waitForSelector('.accordion');
  const brokenLinks = page.getByText('Broken Links - Images', { exact: true });
  await brokenLinks.scrollIntoViewIfNeeded();
  await brokenLinks.click();
  await expect(page.getByRole('heading', { name: 'Broken Links - Images' })).toBeVisible();
});

test('Upload and Download', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByText('Elements', { exact: true }).click();
  await page.waitForSelector('.accordion');
  const uploadDownload = page.getByText('Upload and Download', { exact: true });
  await uploadDownload.scrollIntoViewIfNeeded();
  await uploadDownload.click();
  await expect(page.getByRole('heading', { name: 'Upload and Download' })).toBeVisible();
  await page.getByRole('button', { name: 'Select a file' }).click();
});

test('Dynamic Properties', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByText('Elements').click();
  await page.getByText('Dynamic Properties').click();
  await page.getByRole('button', { name: 'Color Change' }).click();
  await page.getByRole('button', { name: 'Visible After 5 Seconds' }).click();
});









