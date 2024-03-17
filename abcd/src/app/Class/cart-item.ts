import { ComboProduct } from "./comboproduct";
import { Product, Size } from "./product";
import { User } from "./user";

export class CartItem {
    id!: number;
    user!: User;
    product!: Product;
    comboproduct!: ComboProduct;
    size!: Size;
    quantity!: number;
}
