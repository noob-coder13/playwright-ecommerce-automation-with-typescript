import { test,expect } from '../../fixtures/base.fixture';
import { products } from '../../data/products';
import { productSearchCases } from '../../data/productSearchCases';

test.describe('Product page tests @regression', ()=>{
    test.beforeEach('Navigate to Products', async({productPage})=>{
        await productPage.goto();
    });

    productSearchCases.forEach((productSearch)=>{
        const tag= productSearch.searchTerm===products.blueTop.name ? '@smoke' : '';
            test(`product search - ${productSearch.searchTerm} ${tag}`, async({productPage})=>{
            await productPage.searchProduct(productSearch.searchTerm);
            if(productSearch.expectedProduct){
                await expect(productPage.getProduct(productSearch.expectedProduct)).toContainText(productSearch.expectedProduct);

            }
            else{
                await expect(productPage.getProduct(productSearch.searchTerm)).not.toBeVisible();
            }
            
        });

    });

    test('User should be able to add product to the cart @smoke', async({productPage,cartModal})=>{
            await productPage.searchProduct(products.blueTop.name);
            await productPage.addProductToCart(products.blueTop.name);
            await expect(cartModal.productAddedConfirmationMessage).toBeVisible();
        });
    
});