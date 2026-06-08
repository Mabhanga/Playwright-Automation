import { test, expect } from '@playwright/test';

test('Accordian', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByText('Widgets', { exact: true }).click();
  await page.getByText('Accordian', { exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Accordian' })).toBeVisible();
});


test('Auto Complete', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByText('Widgets', { exact: true }).click();
  await page.getByText('Auto Complete', { exact: true }).click();
  const multiInput = page.locator('#autoCompleteMultipleInput');
  await multiInput.fill('black');
  await page.getByText('Black', { exact: true }).click();
  const singleInput = page.locator('#autoCompleteSingleInput');
  await singleInput.fill('blue');
  await singleInput.press('Enter');
});

test('Date Picker', async ({ page }) => {
  await page.goto('https://demoqa.com/date-picker');
  await expect(page.getByRole('heading', { name: 'Date Picker' })).toBeVisible();
  const dateInput = page.locator('#datePickerMonthYearInput');
  await dateInput.click();
  await page.locator('.react-datepicker__day--021:not(.react-datepicker__day--outside-month)').click();
});

test('Slider', async ({ page }) => {
  await page.goto('https://demoqa.com/slider');
  await expect(page.getByRole('heading', { name: 'Slider' })).toBeVisible();
  await page.getByRole('slider').fill('48');
});


test('Progress Bar', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('heading', { name: 'Widgets' }).click();
  await page.getByText('Widgets').click();
  await page.getByText('Widgets').click();
  await page.getByText('Progress Bar').click();
  await page.getByRole('button', { name: 'Start' }).click();
});

test('Tabs', async ({ page }) => {
  await page.goto('https://demoqa.com/tabs');
  await expect(page.getByRole('heading', { name: 'Tabs' })).toBeVisible();

  // What tab
  await page.locator('#demo-tab-what').click();
  await expect(page.locator('#demo-tabpane-what')).toBeVisible();

  // Origin tab
  await page.locator('#demo-tab-origin').click();
  await expect(page.locator('#demo-tabpane-origin')).toBeVisible();

  // Use tab
  await page.locator('#demo-tab-use').click();
  await expect(page.locator('#demo-tabpane-use')).toBeVisible();
});

test('Tool Tips', async ({ page, browserName }) => {
  // Go to DemoQA main page
  await page.goto('https://demoqa.com/');
  await page.locator('div.card-body:has-text("Widgets")').click();
  await expect(page.getByText('Accordian')).toBeVisible();

  const toolTipsLink = page.getByText('Tool Tips', { exact: true });
  await toolTipsLink.scrollIntoViewIfNeeded();
  await toolTipsLink.click();
  await expect(page.getByRole('heading', { name: 'Tool Tips' })).toBeVisible();

  const hoverButton = page.getByRole('button', { name: 'Hover me to see' });

  // Workaround for WebKit hover
  if (browserName === 'webkit') {
    await hoverButton.hover({ force: true });
  } else {
    await hoverButton.hover();
  }

  // Wait for tooltip to appear
  const tooltip = page.locator('.tooltip-inner');
  await tooltip.waitFor({ state: 'visible', timeout: 5000 });

  await expect(tooltip).toBeVisible();
});

