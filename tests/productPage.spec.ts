import { test,expect } from '../fixtures/base.fixture';
import { products } from '../data/products';

test.describe('Product page tests', ()=>{
    test('product search', async({productPage,header,authenticatedPage})=>{
        await header.goToProducts();
        await productPage.searchProduct(products.blueTop.name);
        await expect(productPage.getProduct(products.blueTop.name)).toContainText(products.blueTop.name);
    });

    test('User should be able to add product to the cart', async({authenticatedPage,productPage,header,cartModal})=>{
        await header.goToProducts();
        await productPage.searchProduct(products.blueTop.name);
        await productPage.addProductToCart(products.blueTop.name);
        await expect(cartModal.productAddedConfirmationMessage).toBeVisible();
    });
})