import {Page, Locator} from '@playwright/test';

export class LoginSignupPage{

    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    constructor(page: Page) {
        this.page= page;
        this.emailInput= page.locator('[data-qa="login-email"]');
        this.passwordInput= page.locator('[data-qa="login-password"]');
        this.loginButton= page.locator('[data-qa="login-button"]');
    }

    async goto():Promise<void>{
        await this.page.goto('/login');
    }

    async login(email:string, password: string): Promise<void>{
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click()
    }
}