import { test, expect } from '@playwright/test';
import LoginPage from '../page-object/LoginPage';

test('Login with valid credentials', async ({ page, baseURL }) => {
    const userEmail = process.env.ADMIN_USERNAME;
    const userPassword = process.env.ADMIN_PASSWORD;

    let loginPage = new LoginPage(page);

    await loginPage.goto(baseURL!);
    await loginPage.clickLoginLink();

    // Login
    await loginPage.loginwithCredentials(userEmail!, userPassword!);
    await loginPage.clickLoginButton();

    // Verify successful login
    await loginPage.verifySuccessfulLogin(userEmail!);

    // Save storage state to reuse in other tests
    await page.context().storageState({ path: './auth.json' });
});