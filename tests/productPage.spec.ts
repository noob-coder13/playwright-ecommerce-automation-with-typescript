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
})