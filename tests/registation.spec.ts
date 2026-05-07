import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';


test.describe('Registration feature', async () => {
    test.beforeEach(async ({ page, baseURL }) => {
        await page.goto(baseURL!);
    });


    test('should load page successfully', async ({ page, baseURL }) => {
        const url = page.url();
        const title = await page.title();

        expect.soft(url).toContain(baseURL);
        expect.soft(title).toEqual('Demo Web Shop');
    })

    test('should register with required field', async ({ page }) => {
        // Generate random user data using faker
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email({ firstName, lastName, provider: 'yopmail.com' }).toLowerCase();
        const pass = 'Pass@1234';
        console.log(`Generated email: ${email}`);

        // Click on the Register link
        const registerLink1 = page.getByRole('link', { name: 'Register' });
        await registerLink1.click();


        // Verify that the registration page is loaded and fill the registration form
        const registerHeading = page.getByRole('heading', { name: 'Register' });
        const gender = page.getByRole('radio', { name: 'Male', exact: true });
        const first_name = page.getByRole('textbox', { name: 'First name:' });
        const last_name = page.getByRole('textbox', { name: 'Last name:' });
        const email_address = page.getByRole('textbox', { name: 'Email:' });
        const password = page.getByRole('textbox', { name: 'Password:', exact: true });
        const confirmPassword = page.getByRole('textbox', { name: 'Confirm password:' });

        await expect(registerHeading).toBeVisible();
        await gender.check();
        await first_name.fill(firstName);
        await last_name.fill(lastName);
        await email_address.fill(email);
        await password.fill(pass);
        await confirmPassword.fill(pass);

        // Click on the Register button
        const registerButton = page.getByRole('button', { name: 'Register' });
        await expect(registerButton).toBeVisible();
        await registerButton.click();

        // Verify that the registration is successful
        const registeredUser = page.getByRole('link', { name: email });
        const registrationSuccessMessage = page.getByText('Your registration completed');
        const continueButton = page.getByRole('button', { name: 'Continue' });

        await expect(registeredUser).toBeVisible();
        await expect(registrationSuccessMessage).toBeVisible();
        await expect(continueButton).toBeVisible();
        await expect(registeredUser).toBeVisible();
    });
});

