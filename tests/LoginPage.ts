import { Page } from '@playwright/test';

export class LoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToLoginForm() {
        await this.page.goto('/');
        await this.page.click('text=Sign In');
    }

    async fillEmailField(email: string) {
        await this.page.fill('#loginEmail', email);
        await this.page.locator('#loginEmail').blur();
    }

    async fillPasswordField(password: string) {
        await this.page.fill('#loginPassword', password);
        await this.page.locator('#loginPassword').blur();
    }

    async clickLoginButton() {
        await this.page.click('button:has-text("Login")');
    }
}
