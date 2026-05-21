import { test } from '@playwright/test';
import LoginPage from '../page-object/LoginPage';

test('clear session', async ({ page }) => {
    let loginPage = new LoginPage(page);


    await loginPage.goto('/');
    await loginPage.clickLogoutButton();

    await page.context().clearCookies();
    await page.context().clearPermissions();

    // Clear storage state  
    await page.context().storageState({ path: './auth.json' });
});