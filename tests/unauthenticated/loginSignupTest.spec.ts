import {test,expect} from '../../fixtures/base.fixture';
import { users } from "../../data/users";

test.describe('Login tests', ()=>{
    test('User should login with valid credentials', async({loginPage,header})=>{
        await loginPage.goto();
        await loginPage.login(users.valid.email, users.valid.password);
        await expect(header.getLoggedInUser(users.valid.expectedUserName)).toBeVisible();
    });

    test('User should not be able to login with invalid credentials', async({loginPage})=>{
        await loginPage.goto();
        await loginPage.login(users.invalid.email, users.invalid.password);
        await expect(loginPage.loginErrorMessage).toHaveText(users.invalid.expectedErrorMessage);
    });
});