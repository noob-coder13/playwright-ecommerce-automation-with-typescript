import { test as base, Page } from '@playwright/test';
import { LoginSignupPage } from '../pages/LoginSignupPage';
import { Header } from '../components/Header';
import { ProductPage } from '../pages/ProductPage';
import { CartModal } from '../components/CartModal';
import { users } from '../data/users';

type PageFixtures= {
    loginPage: LoginSignupPage;
    header: Header;
    productPage: ProductPage;
    cartModal: CartModal;
    authenticatedPage: Page;
}

export const test= base.extend<PageFixtures>({
    loginPage: async({page}, use)=>{

        const loginPage= new LoginSignupPage(page);
        await use(loginPage);
    },

    header: async({page}, use)=>{
        const header= new Header(page);
        await use(header);
    },

    productPage: async({page}, use)=>{
        const productPage= new ProductPage(page);
        await use(productPage);
    },

    cartModal: async({page}, use)=>{
        const cartModal= new CartModal(page);
        await use(cartModal);
    },

    authenticatedPage: async({page,loginPage}, use)=>{
        await loginPage.goto();
        await loginPage.login(users.valid.email, users.valid.password);
        await use(page);
    }
});
export{ expect } from '@playwright/test';