import RegisterPage from '../page-object/RegisterPage';
import { test, expect } from './fixtute';
import { newUser } from '../test-data/data-generator';


test.use({ storageState: { cookies: [], origins: [] } }); // Clear cookies and local storage before each test
test.describe('Registration feature', async () => {
    test.beforeEach(async ({ page, baseURL }) => {
        await page.goto(baseURL!);
    });

    test('should load page successfully', async ({ page, baseURL }) => {
        const url = page.url();
        const title = await page.title();

        // Soft assertions to check URL and title
        expect.soft(url).toContain(baseURL);
        expect.soft(title).toEqual('Demo Web Shop');
    })

    test('should register with required field', async ({ page }) => {
        // Generate random user data using faker
        const registerData = newUser();

        // Navigate to registration page
        let reginsterPage = new RegisterPage(page);
        await reginsterPage.goto('/register');


        // Fill registration form and submit
        await reginsterPage.fillRegistrationForm(registerData);
        await reginsterPage.clickRegisterButton();

        // Verify successful registration
        await reginsterPage.verifyRegistrationSuccess(registerData.email);
    });
});

