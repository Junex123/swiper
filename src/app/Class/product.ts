
export class Product {
    [x: string]: any;
    pid!: number;
    name!: string;
    brand!: string;
    description!: string;
    salt!: string;
    totalAvailable!: number;
    discountedPrice!: number; // Corrected attribute name
    price!: number;
    available!: boolean;
    mainImage!:any;
    hoverImage!:any;
    detailImage!:any;
    image1!:any;
    image2!:any;
    image3!:any;
    img1!:any;
    img2!:any;
    img3!:any;
    img4!:any;
    img5!:any;
    img6!:any;
    sizes!: ProductSize[];
    quantity!:ProductQuantity[];
    state!:any;
    settings!:any;
}



export class ProductSize {
    sizeId!: number;
    sizeName!:any;
    available!: boolean;
    checked: boolean = false; // Add the checked property
}


export class SQuantity {
    sqid!: number;
    product!: Product;
    quantity!: number;
}

export class MQuantity {
    mqid!: number;
    product!: Product;
    quantity!: number;
}

export class LQuantity {
    lqid!: number;
    product!: Product;
    quantity!: number;
}

export class XLQuantity {
    xlqid!: number;
    product!: Product;
    quantity!: number;
}

export class ProductQuantity {
    pqid!: number;
    product!: Product;
    quantity!: number;
}
export class ComboProduct {
    id!: number;
    product1!: Product;
    product2!: Product;
}
