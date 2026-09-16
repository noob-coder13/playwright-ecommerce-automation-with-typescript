import {test,expect} from '../../fixtures/base.fixture';
import { users } from "../../data/users";
import { negativeLoginCases,malformedEmailCase } from '../../data/loginNegativeCases';

test.describe('Login tests @regression', ()=>{
    test('User should login with valid credentials @smoke', async({loginPage,header})=>{
        await loginPage.goto();
        await loginPage.login(users.valid.email, users.valid.password);
        await expect(header.getLoggedInUser(users.valid.expectedUserName)).toBeVisible();
    });
    test('user should not be able to login with malformed email', async({loginPage})=>{
        await loginPage.goto();
        await loginPage.login(malformedEmailCase.email, malformedEmailCase.password);
        const isTypeMismatch= await loginPage.isEmailTypeMismatch();
        expect(isTypeMismatch).toBe(true);
    });
    negativeLoginCases.forEach((negativeLoginCase)=>{
        test(`User should not be able to login with ${negativeLoginCase.testName}`, async({loginPage})=>{
        await loginPage.goto();
        await loginPage.login(negativeLoginCase.email, negativeLoginCase.password);
        await expect(loginPage.loginErrorMessage).toHaveText(negativeLoginCase.expectedErrorMessage);
    });
    });
});