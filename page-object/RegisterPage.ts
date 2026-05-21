import { Page, Locator, expect } from '@playwright/test';
import BasePage from './BasePage';
import { da } from '@faker-js/faker';

export default class RegisterPage extends BasePage {
    readonly registerButton: Locator;
    readonly registerHeading: Locator;
    readonly first_name: Locator;
    readonly last_name: Locator;
    readonly email_address: Locator;
    readonly password: Locator;
    readonly confirmPassword: Locator;
    readonly registrationSuccessMessage: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        super(page);
        this.registerButton = page.getByRole('button', { name: 'Register' });
        this.registerHeading = page.getByRole('heading', { name: 'Register' });
        this.first_name = page.getByRole('textbox', { name: 'First name:' });
        this.last_name = page.getByRole('textbox', { name: 'Last name:' });
        this.email_address = page.getByRole('textbox', { name: 'Email:' });
        this.password = page.getByRole('textbox', { name: 'Password:', exact: true });
        this.confirmPassword = page.getByRole('textbox', { name: 'Confirm password:' });
        this.registrationSuccessMessage = this.page.getByText('Your registration completed');
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
    }

    async goto(url: string = '/register') {
        await this.page.goto(url);
    }

    async fillRegistrationForm(data: any) {
        await this.page.getByRole('radio', { name: data.gender, exact: true }).check();
        await this.first_name.fill(data.firstName);
        await this.last_name.fill(data.lastName);
        await this.email_address.fill(data.email);
        await this.password.fill(data.pass);
        await this.confirmPassword.fill(data.pass);
    }


    async clickRegisterButton() {
        await this.registerButton.click();
    }


    async verifyRegistrationSuccess(email: string) {
        await expect(this.page.getByRole('link', { name: email })).toBeVisible();
        await expect(this.registrationSuccessMessage).toBeVisible();
        await expect(this.continueButton).toBeVisible();
    }
}
