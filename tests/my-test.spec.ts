import { test, expect } from './fixtute';

test('my test', async ({ page }) => {
    await page.goto('https://www.google.com');
    await expect(page).toHaveTitle('Google');
});