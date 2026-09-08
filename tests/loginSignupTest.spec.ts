import {test, expect }from "@playwright/test";
import { LoginSignupPage } from "../pages/LoginSignupPage";
import { users } from "../data/users";

test.describe('Login tests', ()=>{
    test('User should login with valid credentials', async({page})=>{
        const loginSignupPage= new LoginSignupPage(page);
        await loginSignupPage.goto();
        await loginSignupPage.login(users.valid.email, users.valid.password);
        await expect(page.getByText(`Logged in as ${users.valid.expectedUserName}`)).toBeVisible();
    });

    test('User should not be able to login with invalid credentials', async({page})=>{
        const loginSignupPage= new LoginSignupPage(page);
        await loginSignupPage.goto();
        await loginSignupPage.login(users.invalid.email, users.invalid.password);
        await expect(loginSignupPage.loginErrorMessage).toHaveText(users.invalid.expectedErrorMessage);
    })
});