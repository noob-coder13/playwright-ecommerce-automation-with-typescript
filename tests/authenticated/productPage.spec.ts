import { test,expect } from '../../fixtures/base.fixture';
import { products } from '../../data/products';

test.describe('Product page tests', ()=>{
    test.beforeEach('Navigate to Products', async({productPage})=>{
        await productPage.goto();
    });

    test('product search', async({productPage})=>{
        await productPage.searchProduct(products.blueTop.name);
        await expect(productPage.getProduct(products.blueTop.name)).toContainText(products.blueTop.name);
    });

    test('User should be able to add product to the cart', async({productPage,cartModal})=>{
        await productPage.searchProduct(products.blueTop.name);
        await productPage.addProductToCart(products.blueTop.name);
        await expect(cartModal.productAddedConfirmationMessage).toBeVisible();
    });
})