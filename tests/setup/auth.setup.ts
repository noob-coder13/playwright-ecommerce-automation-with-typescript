import {users} from '../../data/users';
import {test, expect} from '@playwright/test';
import { LoginSignupPage } from '../../pages/LoginSignupPage';
import { Header } from '../../components/Header';

test('authenticate user and save storage state', async({page})=>{
    const loginPage= new LoginSignupPage(page);
    const header= new Header(page);
    await loginPage.goto();
    await loginPage.login(users.valid.email, users.valid.password);
    await expect(header.getLoggedInUser(users.valid.expectedUserName)).toBeVisible();
    await page.context().storageState({
        path: 'playwright/.auth/authstate.json'
    });
});
