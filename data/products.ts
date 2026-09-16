interface Product{
    name: string;
    price: number;
}

interface Products{
    blueTop: Product;
    menTshirt: Product;
    sleevelessDress: Product;
}

export const products: Products={
    blueTop:{
        name: "Blue Top",
        price: 500,
    },

    menTshirt:{
        name: "Men Tshirt",
        price: 400,
    },
    sleevelessDress:{
        name: "Sleeveless Dress",
        price: 1000,
    }
};

