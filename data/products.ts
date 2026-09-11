interface Product{
    name: string;
}

interface Products{
    blueTop: Product;
    menTshirt: Product;
}

export const products: Products={
    blueTop:{
        name: "Blue Top",
    },

    menTshirt:{
        name: "Men Tshirt",
    }
};
