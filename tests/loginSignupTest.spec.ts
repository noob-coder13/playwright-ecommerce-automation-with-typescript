import {test, expect }from "@playwright/test";
import { LoginSignupPage } from "../pages/LoginSignupPage";

test.describe('Login tests', ()=>{
    test('User should login with valid credentials', async({page})=>{
        const loginSignupPage= new LoginSignupPage(page);
        await loginSignupPage.goto();
        await loginSignupPage.login('abhishek3rawat@gmail.com', 'Mahadev@0M');
        await expect(page.getByText('Logged in as Abhishek Rawat')).toBeVisible();
    });
});