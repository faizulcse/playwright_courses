import { Locator, Page } from "@playwright/test";

export default class BasePage {
    page: Page;
    readonly login: Locator;

    constructor(page: Page) {
        {
            this.page = page;
            this.login = page.locator('text=Login');
        }
    }


    async sleep(ms: number) {
        console.log(`Sleeping for ${ms / 1000} s`);
        await this.page.waitForTimeout(ms);
    }
}