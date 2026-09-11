import {Locator, Page} from '@playwright/test';

export class CartModal{
    readonly page: Page;
    readonly viewCartLink: Locator;
    readonly continueShoppingButton: Locator;
    readonly productAddedConfirmationMessage: Locator;

    constructor(page: Page){
        this.page= page;
        this.viewCartLink= page.getByRole('link', {name:'View Cart'});
        this.continueShoppingButton= page.getByRole('button', {name:'Continue Shopping'});
        this.productAddedConfirmationMessage= page.locator('.modal-body').filter({hasText:'Your product has been added to cart.'});
    }

    async viewCart():Promise<void>{
        await this.viewCartLink.click();
    }

    async continueShopping(): Promise<void>{
        await this.continueShoppingButton.click();
    }

}