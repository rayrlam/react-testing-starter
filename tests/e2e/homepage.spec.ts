import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage before each test
    await page.goto('http://localhost:5173');
  });

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/testing react app/i);
  });

  test('displays navigation menu with correct links', async ({ page }) => {
    const navigation = page.locator('div[role="navigation"]');
    await expect(navigation).toBeVisible();

    const menuList = navigation.locator('ul');
    await expect(menuList).toBeVisible();

    const menuItems = menuList.locator('li');
    await expect(menuItems).toHaveCount(3);

    const productsLink = menuList.locator('li a:has-text("Products")');
    const playgroundLink = menuList.locator('li a:has-text("Playground")');
    const AdminLink = menuList.locator('li a:has-text("Admin")');

    await expect(productsLink).toBeVisible();
    await expect(playgroundLink).toBeVisible();
    await expect(AdminLink).toBeVisible();

    await expect(productsLink).toHaveAttribute('href', '/products');
    await expect(playgroundLink).toHaveAttribute('href', '/playground');
    await expect(AdminLink).toHaveAttribute('href', '/admin');
  });

  test('can navigate to products page', async ({ page }) => {
    const productsLink = page.locator('a:has-text("Products")');
    await productsLink.click();

    await expect(page).toHaveURL('http://localhost:5173/products');
    const productsHeading = page.locator('h1:has-text("Products")');
    await expect(productsHeading).toBeVisible();
  });
});