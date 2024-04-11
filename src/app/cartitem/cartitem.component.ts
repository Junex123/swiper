import { Component, OnInit } from '@angular/core';

import { Router, RouterLink, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { Cart } from '../Class/Cart';
import { CartItemResponseDto } from '../Class/CartItemResponseDto';
import { NavbarComponent } from '../navbar/navbar.component';
import { CartService } from '../service/cart.service';
import { LoginService } from '../service/login.service';


@Component({
  selector: 'app-cartitem',
  standalone: true,
  imports: [NavbarComponent,RouterModule,RouterLink,CommonModule],
  templateUrl: './cartitem.component.html',
  styleUrl: './cartitem.component.scss'
})
export class CartitemComponent implements OnInit {
  cartItems: Cart[] = [];
  User: any;
  totalPrice: number=0;
  public emptyCart: boolean=true;

  constructor(private cartService: CartService,private router: Router,private loginService: LoginService) { }

  ngOnInit(): void {
    const userDetails = this.loginService.getUserDetails();
    if (userDetails && userDetails.username) {
      this.getCartItems(userDetails.username);
    } else {
      // Handle case where username is not available
      console.error('Username not available');
    }
  
  }
  
  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  getCartItems(username: string) {
    this.cartService.getCartDetails(username).subscribe({
      next: (cartItemResponseDtos: CartItemResponseDto[]) => {
        console.log('Cart Items:', cartItemResponseDtos);
  
        this.cartItems = cartItemResponseDtos.map(dto => ({
          id: dto.id,
          product: dto.product,
          quantity: dto.quantity,
          user: dto.user
        }));
  
        this.cartItems.forEach(cartItem => {
          console.log('Product:', cartItem.product);
          
          // Check main image
          console.log('Main Image Data:', cartItem.product.mainImage.imageData);
          console.log('Main Image:', cartItem.product.mainImage);
  
          // Check detail image
          console.log('Detail Image Data:', cartItem.product.detailImage.imageData);
          console.log('Detail Image:', cartItem.product.detailImage);
  
          if (cartItem.product.mainImage && cartItem.product.mainImage.imageData) {
            // Ensure proper base64 encoding with data URI scheme
            cartItem.product.mainImage = 'data:image/jpeg;base64,' + cartItem.product.mainImage.imageData;
          }
          if (cartItem.product.detailImage && cartItem.product.detailImage.imageData) {
            // Ensure proper base64 encoding with data URI scheme
            cartItem.product.detailImage = 'data:image/png;base64,' + cartItem.product.detailImage.imageData;
          }
          
        });

        this.calculateTotalPrice(); 
      }, 
      error: (error) => {
        console.error('Error fetching cart items:', error);
        alert('Failed to fetch cart items');
      }
    });
  }


  
  
  

  removeCartItem(cartItemId: number) {
    this.cartService.deleteCartItem(cartItemId).subscribe(
      () => {
        this.cartItems = this.cartItems.filter(item => item.id !== cartItemId);
        this.calculateTotalPrice();
      },
      (error) => {
        console.error('Error removing cart item:', error);
      }
    );
  }

  goToShipping() {
    this.router.navigate(['cart', 'shippingaddress']);
  }


}











