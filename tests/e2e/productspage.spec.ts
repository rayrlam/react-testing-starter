import { test, expect } from '@playwright/test';

test.describe('Products Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the products page before each test
    await page.goto('http://localhost:5173/products');
  });

  test('has products heading', async ({ page }) => {
    const productsHeading = page.locator('h1');
    await expect(productsHeading).toBeVisible();
    await expect(productsHeading).toHaveText('Products');
  });

  test('has a table with "Name" and "Price" column headers', async ({ page }) => {
    const table = await page.locator('table');
    await expect(table).toBeVisible();

    const nameHeader = await table.locator('th', { hasText: 'Name' });
    await expect(nameHeader).toBeVisible();

    const priceHeader = await table.locator('th', { hasText: 'Price' });
    await expect(priceHeader).toBeVisible();
  });

  test('has a link with "Name", "Price" and "Button" in the same row', async ({ page }) => {
    const table = await page.locator('table');

    const productLink = await table.locator(`a[href="/products/1"]`);
    await expect(productLink).toBeVisible();
    await expect(productLink).toHaveText('Refined Concrete Soap');
  
    // Find the parent row of the link
    const row = await productLink.locator('xpath=ancestor::tr');
  
    // Find the next column in the row that should contain "$799"
    const priceColumn = await row.locator('td').nth(1);
    await expect(priceColumn).toHaveText('$799');

    // Find the next column in the row that should has a button "Add to Cart"
    const addToCartButton = await row.locator('td').nth(2).locator('button', { hasText: 'Add to Cart' });
    await expect(addToCartButton).toBeVisible();
  });
});