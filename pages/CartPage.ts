import { Locator, Page, expect } from "@playwright/test";

export class CartPage{
    readonly page: Page;
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly productTotal: Locator;
    readonly productQuantity: Locator;
    readonly deleteCartItemsButton: Locator;

    constructor(page:Page){
        this.page= page;
        this.productName= page.locator('.cart_description');
        this.productTotal= page.locator('.cart_total');
        this.productPrice= page.locator('.cart_price');
        this.productQuantity= page.locator('.cart_quantity');
        this.deleteCartItemsButton= page.locator('.cart_quantity_delete');
    }

    async goto(): Promise<void>{
        await this.page.goto('/view_cart', {waitUntil: 'domcontentloaded'});
    }

    async clearCart(): Promise<void> {
        while (await this.deleteCartItemsButton.count() > 0) {
            const currentCount = await this.deleteCartItemsButton.count();
            await this.deleteCartItemsButton.first().click();
            await expect(this.deleteCartItemsButton)
                .toHaveCount(currentCount - 1);
    }
 }
}