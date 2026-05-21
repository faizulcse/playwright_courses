import { test, expect } from './fixtute';
import LoginPage from '../page-object/LoginPage';

test.use({ storageState: { cookies: [], origins: [] } });
test.describe('Login feature test', () => {


    test('Login with valid invalid credentials', async ({ page, baseURL }) => {
        const userEmail = "wrong_email@yopmail.com";
        const userPassword = "asdflknasdfasd";
        
        // Navigate to login page
        let loginPage: LoginPage = new LoginPage(page);
        await loginPage.goto(baseURL!);

        // Login with invalid credentials
        await loginPage.clickLoginLink();
        await loginPage.loginwithCredentials(userEmail, userPassword);
        await loginPage.clickLoginButton();

        // Verify error message
        await loginPage.verifyLoginErrorMessage('Login was unsuccessful. Please correct the errors and try again.');
    });
});