export class Product {
      product: any;
      forEach(arg0: (p: any) => void) {
        throw new Error('Method not implemented.');
      }
      pid!: number;
      name!: string;
      brand!: string;
      category!: string;
      description!: string;
      salt!: string;
      totalAvailable!: number;
      price!: number;
      available!: boolean;
      productImage!: ProductImage;
      productSize!: ProductSize;
  }
  
  export class ProductImage {
      imgId!: number;
      name!: string;
      type!: string;
      imageData!: any;
  }
  
  export class ProductSize {
      sizeId!: number;
      sizeName!: Size;
      isAvailable!: boolean;
  }
  
  export enum Size {
      S = 'S',
      M = 'M',
      L = 'L',
      XL = 'XL'
  }
  