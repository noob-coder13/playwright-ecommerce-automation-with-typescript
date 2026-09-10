import { test as base } from '@playwright/test';
import { LoginSignupPage } from '../pages/LoginSignupPage';
import { Header } from '../components/Header';

type PageFixtures= {
    loginPage: LoginSignupPage;
    header: Header;
}

export const test= base.extend<PageFixtures>({
    loginPage: async({page}, use)=>{

        const loginPage= new LoginSignupPage(page);
        await use(loginPage);
    },

    header: async({page}, use)=>{
        const header= new Header(page);
        await use(header);
    }
});
export{ expect } from '@playwright/test';