import {Locator,Page} from '@playwright/test';


export class Header {
    readonly page: Page;
    readonly productsLink: Locator;

    constructor(page: Page){
        this.page= page;
        this.productsLink= page.getByRole('link', {name: ' Products'});

    }

    getLoggedInUser(username:string): Locator{
        return this.page.getByText(`Logged in as ${username}`);
    }

    async goToProducts():Promise<void>{
        await this.productsLink.click();

    }
}
