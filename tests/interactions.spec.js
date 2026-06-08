import { test, expect } from '@playwright/test';

test.describe('Interactions', () => {
  test.describe.configure({ mode: 'serial' });

  test('Sortable', async ({ page }) => {
    await page.goto('https://demoqa.com/sortable');
    await expect(page.getByRole('heading', { name: 'Sortable' })).toBeVisible();
    await page.waitForTimeout(1000);

    const firstItem = page.locator('#demo-tabpane-list .list-group-item').nth(0);
    const thirdItem = page.locator('#demo-tabpane-list .list-group-item').nth(2);

    const sourceBox = await firstItem.boundingBox();
    const targetBox = await thirdItem.boundingBox();

    await page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(500);
    await page.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + targetBox.height / 2, { steps: 20 });
    await page.waitForTimeout(500);
    await page.mouse.up();
    await page.waitForTimeout(500);
  });

  test('Selectable', async ({ page }) => {
    await page.goto('https://demoqa.com/selectable');
    await expect(page.getByRole('heading', { name: 'Selectable' })).toBeVisible();

    const firstItem = page.locator('#demo-tabpane-list .list-group-item').nth(0);
    await firstItem.click();
    await expect(firstItem).toHaveClass(/active/);
  });

  test('Resizable', async ({ page }) => {
    await page.goto('https://demoqa.com/resizable');
    await expect(page.getByRole('heading', { name: 'Resizable' })).toBeVisible();
    await page.waitForTimeout(1000);

    const resizableBox = page.locator('#resizableBoxWithRestriction');
    const resizeHandle = resizableBox.locator('.react-resizable-handle');

    const boxBefore = await resizableBox.boundingBox();
    const handleBox = await resizeHandle.boundingBox();

    await page.mouse.move(handleBox.x + handleBox.width / 2, handleBox.y + handleBox.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(300);
    await page.mouse.move(handleBox.x + 150, handleBox.y + 100, { steps: 30 });
    await page.waitForTimeout(300);
    await page.mouse.up();
    await page.waitForTimeout(500);

    const boxAfter = await resizableBox.boundingBox();
    expect(boxAfter.width).not.toBe(boxBefore.width);
  });

  test('Droppable', async ({ page }) => {
    await page.goto('https://demoqa.com/droppable');
    await expect(page.getByRole('heading', { name: 'Droppable' })).toBeVisible();
    await page.waitForTimeout(2000);

    const dragElement = page.locator('#draggable');
    const dropTarget = page.locator('#droppable p').first();

    const sourceBox = await dragElement.boundingBox();
    const targetBox = await dropTarget.boundingBox();

    await page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(1000);
    await page.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + targetBox.height / 2, { steps: 50 });
    await page.waitForTimeout(1000);
    await page.mouse.up();
    await page.waitForTimeout(1500);

    await expect(page.locator('#droppable p').first()).toContainText('Dropped!', { timeout: 10000 });
  });

  test('Draggable', async ({ page }) => {
    await page.goto('https://demoqa.com/dragabble');
    await expect(page.getByRole('heading', { name: 'Dragabble' })).toBeVisible();
    await page.waitForTimeout(1000);

    const dragElement = page.locator('#dragBox');
    const sourceBox = await dragElement.boundingBox();

    await page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(800);
    await page.mouse.move(sourceBox.x + 200, sourceBox.y + 100, { steps: 30 });
    await page.waitForTimeout(800);
    await page.mouse.up();
    await page.waitForTimeout(500);

    const boxAfter = await dragElement.boundingBox();
    expect(boxAfter.x).not.toBe(sourceBox.x);
  });
});