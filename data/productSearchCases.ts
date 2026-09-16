import { products } from "./products";
interface ProductSearchCase{
    searchTerm: string;
    expectedProduct?: string;
}

export const productSearchCases:ProductSearchCase[]=[
    {
        searchTerm: products.blueTop.name,
        expectedProduct: products.blueTop.name,
    },
    {
        searchTerm: products.menTshirt.name,
        expectedProduct:products.menTshirt.name,
    },
    {
        searchTerm:products.sleevelessDress.name,
        expectedProduct:products.sleevelessDress.name,
    },
    {
        searchTerm: 'iPhone 99',
    }
]