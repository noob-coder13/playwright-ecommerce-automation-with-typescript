import { products } from '../../data/products';
import {expect, test} from '../../fixtures/base.fixture';


test.describe('Cart tests @regression', ()=>{
    test.beforeEach('Clear cart items', async({cartPage})=>{
        await cartPage.goto();
        await cartPage.clearCart();
    });
            test('Products in cart test @smoke', async({productPage,cartModal,cartPage})=>{
            await productPage.goto();
            await productPage.searchProduct(products.blueTop.name);
            await productPage.addProductToCart(products.blueTop.name);
            await expect(cartModal.productAddedConfirmationMessage).toBeVisible();
            await cartModal.viewCart();
            await expect(cartPage.productName).toContainText(products.blueTop.name);
            await expect(cartPage.productPrice).toContainText(`Rs. ${products.blueTop.price}`);
            const quantity=1;
            const expectedTotal= products.blueTop.price*quantity;
            await expect(cartPage.productQuantity).toContainText(`${quantity}`);
            await expect(cartPage.productTotal).toContainText(`Rs. ${expectedTotal}`);

        });
});