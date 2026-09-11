import { Locator, Page } from "@playwright/test";

export class ProductPage{

    readonly page: Page;
    readonly searchProductField: Locator;
    readonly searchProductButton: Locator;

    constructor(page: Page){
        this.page= page;
        this.searchProductField= page.getByPlaceholder('Search Product');
        this.searchProductButton= page.locator('#advertisement').locator('#submit_search');

    }
    async searchProduct(productName:string):Promise<void>{
        await this.searchProductField.fill(productName);
        await this.searchProductButton.click();
    }

     getProduct(productName:string): Locator{
        return this.page.locator('.productinfo').filter({hasText: productName});

    }

    async addProductToCart(productName: string): Promise<void>{
        const product = this.getProduct(productName);
        const addToCartButton = product.locator('.add-to-cart');
        await addToCartButton.click();
    }
}