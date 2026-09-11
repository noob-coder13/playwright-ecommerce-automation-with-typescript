import { users } from '../data/users';
import { test,expect } from '../fixtures/base.fixture';
import { products } from '../data/products';

test.describe('Product page tests', ()=>{
    test('product search', async({loginPage,productPage,header})=>{
        await loginPage.goto();
        await loginPage.login(users.valid.email, users.valid.password);
        await header.goToProducts();
        await productPage.searchProduct(products.blueTop.name);
        await expect(productPage.getProduct(products.blueTop.name)).toContainText(products.blueTop.name);
    });

    test('User should be able to add product to the cart', async({loginPage,productPage,header,cartModal})=>{
        await loginPage.goto();
        await loginPage.login(users.valid.email, users.valid.password);
        await header.goToProducts();
        await productPage.searchProduct(products.blueTop.name);
        await productPage.addProductToCart(products.blueTop.name);
        await expect(cartModal.productAddedConfirmationMessage).toBeVisible();
    });
})