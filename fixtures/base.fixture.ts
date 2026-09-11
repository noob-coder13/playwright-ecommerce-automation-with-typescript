import { test as base } from '@playwright/test';
import { LoginSignupPage } from '../pages/LoginSignupPage';
import { Header } from '../components/Header';
import { ProductPage } from '../pages/ProductPage';
import { CartModal } from '../components/CartModal';

type PageFixtures= {
    loginPage: LoginSignupPage;
    header: Header;
    productPage: ProductPage;
    cartModal: CartModal;
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
    }

});
export{ expect } from '@playwright/test';