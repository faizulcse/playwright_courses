import { test, expect } from './fixtute';


test.use({ storageState: { cookies: [], origins: [] } });
test.describe('Login feature test', () => {

    test('Login with valid credentials', async ({ page, baseURL }) => {
        await page.goto(baseURL!);

        // Login
        await page.getByRole('link', { name: 'Log in' }).click();

        await page.getByRole('textbox', { name: 'Email:' }).fill(process.env.ADMIN_USERNAME!);
        await page.getByRole('textbox', { name: 'Password:' }).fill('wrongPass');
        await page.getByRole('checkbox', { name: 'Remember me?' }).check();
        await page.getByRole('button', { name: 'Log in' }).click();

        await expect(page.getByText('The credentials provided are incorrect')).toBeVisible();
    });
});