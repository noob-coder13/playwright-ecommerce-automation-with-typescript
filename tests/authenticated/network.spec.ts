
import { products } from "../../data/products";
import { expect, test } from "../../fixtures/base.fixture";

test('product search network response', async({productPage,page})=>{
    await productPage.goto();
    const responsePromise= page.waitForResponse(response=>
        response.url().includes('search=')
    );

    await productPage.searchProduct(products.blueTop.name);
    const response= await responsePromise;
    expect(response.status()).toBe(200);
    expect(response.url()).toContain('search=');
});

test('product image request should fail when route is aborted', async({page,productPage})=>{
    await page.route('**/get_product_picture/1', async route=>{
        await route.abort();
    });
    const failedRequestPromise= page.waitForEvent('requestfailed',{
        predicate: request=>{
            return request.url().includes('/get_product_picture/1');
        }
    });
    await productPage.goto();
    const failedRequest= await failedRequestPromise;
    expect(failedRequest.url()).toContain('/get_product_picture/1');
});

test('product image mocked with 404 response', async ({page,productPage})=>{
    await page.route('**/get_product_picture/1', async(route)=>{
        await route.fulfill({
            status: 404,
            contentType: 'text/plain',
            body: 'Product image unavailable'
        });
    });
    const responsePromise= page.waitForResponse( response=>{
        return response.url().includes('/get_product_picture/1');
    });
    await productPage.goto();
    const response= await responsePromise;
    expect(response.status()).toBe(404);

});