import { test, expect } from '@playwright/test';

test('has title', async ({ page ,baseURL}) => {
  await page.goto(baseURL!);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page, baseURL }) => {
  await page.goto(baseURL!);

  // Click the get started link.
  await page.getByRole('link', { name: 'Get ssdfgasdtarted'}).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
