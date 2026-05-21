
import BasePage from './BasePage';
import { Page, Locator, expect } from "@playwright/test";

export default class LoginPage extends BasePage {
    readonly loginLink: Locator;
    readonly emailFiled: Locator;
    readonly passwordField: Locator;
    readonly rememberMeCheckbox: Locator;
    readonly loginButton: Locator;
    readonly registerButton: Locator;
    readonly logoutButton: Locator;


    constructor(page: Page) {
        super(page);
        this.loginLink = page.getByRole('link', { name: 'Log in' });
        this.emailFiled = page.getByRole('textbox', { name: 'Email:' });
        this.passwordField = page.getByRole('textbox', { name: 'Password:' });
        this.rememberMeCheckbox = page.getByRole('checkbox', { name: 'Remember me?' });
        this.loginButton = page.getByRole('button', { name: 'Log in' });
        this.registerButton = page.getByRole('button', { name: 'Register' });
        this.logoutButton =  page.getByRole('link', { name: 'Log out' });
    }


    async goto(url: string = '/') {
        await this.page.goto(url);
    }

    async clickLoginLink() {
        await this.loginLink.click();

    }

    async loginwithCredentials(username: string, password: string) {
        await this.emailFiled.fill(username);
        await this.passwordField.fill(password);
        await this.rememberMeCheckbox.check();
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }


    async verifyLoginErrorMessage(message: string) {
        await expect(this.page.getByText(message)).toBeVisible();
    }


    async verifySuccessfulLogin(username: string) {
        await expect(this.page.getByRole('link', { name: username })).toBeVisible();
        await expect(this.registerButton).toBeHidden();
    }

    async clickLogoutButton() {
        await this.logoutButton.click();
    }
}