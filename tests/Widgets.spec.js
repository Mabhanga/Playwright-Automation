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
  await page.goto('https://demoqa.com/');
  await page.locator('path').nth(3).click();
  await page.getByRole('heading', { name: 'Widgets' }).click();
  await page.getByText('Widgets').click();
  await page.getByText('Date Picker').click();
  await expect(page.getByRole('heading', { name: 'Date Picker' })).toBeVisible();
  await page.locator('#datePickerMonthYearInput').click();
  await page.getByRole('option', { name: 'Choose Tuesday, October 21st,' }).click();
});

test('Slider', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('heading', { name: 'Widgets' }).click();
  await page.getByText('Widgets').click();
  await page.getByText('Widgets').click();
  await page.getByText('Slider').click();
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
  await page.goto('https://demoqa.com/');
  await page.locator('.card-body:has-text("Widgets")').click();
  await page.waitForSelector('.left-pannel');
  await page.locator('span:has-text("Tabs")').scrollIntoViewIfNeeded();
  await page.locator('span:has-text("Tabs")').click();
  await page.waitForURL('**/tabs');
  await expect(page.locator('#demo-tab-what')).toBeVisible();
  await page.waitForSelector('.nav-tabs', { state: 'visible' });
  const tabs = ['Origin', 'Use', 'What'];

  for (const tab of tabs) {
    const tabLocator = page.locator(`#demo-tab-${tab.toLowerCase()}`);
    await tabLocator.scrollIntoViewIfNeeded();
    await tabLocator.evaluate(node => node.click());
    await page.waitForFunction(
      id => document.querySelector(id)?.getAttribute('aria-hidden') === 'false',
      `#demo-tabpane-${tab.toLowerCase()}`
    );
    await expect(page.locator(`#demo-tabpane-${tab.toLowerCase()}`)).toBeVisible();
  }
});

test('Tool Tips', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('heading', { name: 'Widgets' }).click();
  await page.getByText('Widgets').click();
  await page.getByText('Tool Tips').click();
  await page.getByRole('button', { name: 'Hover me to see' }).click();
});


test.only('Select Menu Test - Robust Cross-Browser', async ({ page }) => {
  // Navigate directly to Select Menu page
  await page.goto('https://demoqa.com/select-menu', { waitUntil: 'domcontentloaded' });

  // Remove popups/ads
  await page.evaluate(() => {
    document.querySelectorAll('[id*="Ad.Plus"], .popup, .modal, iframe, #fixedban').forEach(el => el.remove());
  });

  // Wait for the page main header
  await page.locator('.main-header').waitFor({ state: 'visible', timeout: 10000 });

  // Old style select
  await page.locator('#oldSelectMenu').selectOption('2');

  // Standard React-select dropdown - Group 1
  const group1Dropdown = page.locator('#selectOne'); // the visible container
  await group1Dropdown.click();
  await page.locator('div[id^="react-select-"][id$="-option-0"]:has-text("Group 1, option 1")').click();

  // React-select dropdown - Title (Mr./Mrs./Other)
  const titleDropdown = page.locator('#selectTitle'); // visible container
  await titleDropdown.click();

  // Wait for dropdown portal to appear and select "Mr."
  const mrOption = page.locator('div[id^="react-select-"][id$="-option-0"]:has-text("Mr.")');
  await mrOption.waitFor({ state: 'visible', timeout: 10000 });
  await mrOption.click();

  // React-select dropdown - Old Style Select 4
  const select4Dropdown = page.locator('#selectMenuContainer #withOptGroup'); 
  await select4Dropdown.click();
  await page.locator('#react-select-4-option-0').click();

  // Multi-select cars
  await page.locator('#cars').selectOption('opel');

  // Validate selections
  await expect(page.locator('#cars')).toHaveValue('opel');
});


