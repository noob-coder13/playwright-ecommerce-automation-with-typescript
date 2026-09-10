import {Locator,Page} from '@playwright/test';


export class Header {
    readonly page: Page;

    constructor(page: Page){
        this.page= page;

    }

    getLoggedInUser(username:string): Locator{
        return this.page.getByText(`Logged in as ${username}`);
    }
}
