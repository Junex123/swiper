import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CartItemResponseDto } from '../Class/CartItemResponseDto';
import { Product } from '../Class/product';
import { LoginService } from './login.service';
import { WishlistResponseDto } from '../Class/wishlist-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:9400';
  private cartCountSubject: BehaviorSubject<number>; // Initialize cart count subject
  public cartCount$: Observable<number>; // Observable for cart count
  private wishlistCountSubject: BehaviorSubject<number>; // Initialize wishlist count subject
  public wishlistCount$: Observable<number>; // Observable for wishlist count
  public cartItems: CartItemResponseDto[] = []; // Define cartItems property
  public wishlistItems: WishlistResponseDto[] = []; // Define wishlistItems property
  public totalPrice: BehaviorSubject<number>; // Define totalPrice property

  constructor(private http: HttpClient, private loginService: LoginService) {
    // Initialize cart count subject with initial value from local storage or default to 0
    const initialCartCount = Number(localStorage.getItem('cartCount')) || 0;
    this.cartCountSubject = new BehaviorSubject<number>(initialCartCount);
    this.cartCount$ = this.cartCountSubject.asObservable();

    // Initialize wishlist count subject with initial value from local storage or default to 0
    const initialWishlistCount = Number(localStorage.getItem('wishlistCount')) || 0;
    this.wishlistCountSubject = new BehaviorSubject<number>(initialWishlistCount);
    this.wishlistCount$ = this.wishlistCountSubject.asObservable();

    // Initialize totalPrice subject with initial value of 0
    this.totalPrice = new BehaviorSubject<number>(0);
  }

  addToCart(product: Product, quantity: number): Observable<any> {
    const userDetails = this.loginService.getUserDetails();
    const username = userDetails.username;
    this.cartCountSubject.next(this.cartCountSubject.value + 1); // Increment cart count
    // Store updated cart count in local storage
    localStorage.setItem('cartCount', String(this.cartCountSubject.value));
    return this.http.post<any>(`${this.baseUrl}/cart/add?quantity=${quantity}&username=${username}`, product);
  }

  addToWishlist(product: Product): Observable<any> {
    const userDetails = this.loginService.getUserDetails();
    const username = userDetails.username;
    this.wishlistCountSubject.next(this.wishlistCountSubject.value + 1); // Increment wishlist count
    // Store updated wishlist count in local storage
    localStorage.setItem('wishlistCount', String(this.wishlistCountSubject.value));
    return this.http.post<any>(`${this.baseUrl}/wishlist/add?username=${username}`, product);
  }

  getCartDetails(username: string): Observable<CartItemResponseDto[]> {
    return this.http.get<CartItemResponseDto[]>(`${this.baseUrl}/cart?username=${username}`).pipe(
      tap((items: CartItemResponseDto[]) => {
        this.cartItems = items; // Update cartItems property
        this.updateCartCount(); // Update cart count based on cart items
        this.calculateTotalPrice(); // Update total price based on cart items
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  getWishlistDetails(username: string): Observable<WishlistResponseDto[]> {
    return this.http.get<WishlistResponseDto[]>(`${this.baseUrl}/wishlist?username=${username}`).pipe(
      tap((items: WishlistResponseDto[]) => {
        this.wishlistItems = items; // Update wishlistItems property
        this.updateWishlistCount(); // Update wishlist count based on wishlist items
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  deleteCartItem(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/cart/${id}`).pipe(
      tap(() => {
        // Decrement cart count when item is successfully removed
        if (this.cartCountSubject.value > 0) {
          this.cartCountSubject.next(this.cartCountSubject.value - 1);
          // Store updated cart count in local storage
          localStorage.setItem('cartCount', String(this.cartCountSubject.value));
        }
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  deleteWishlistItem(wishid: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/wishlist/${wishid}`).pipe(
      tap(() => {
        // Decrement wishlist count when item is successfully removed
        if (this.wishlistCountSubject.value > 0) {
          this.wishlistCountSubject.next(this.wishlistCountSubject.value - 1);
          // Store updated wishlist count in local storage
          localStorage.setItem('wishlistCount', String(this.wishlistCountSubject.value));
        }
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  calculateTotalPrice() {
    let total = 0;
    for (const item of this.cartItems) {
      total += item.product.price * item.quantity;
    }
    this.totalPrice.next(total);
  }

  private updateCartCount() {
    this.cartCountSubject.next(this.cartItems.length);
    localStorage.setItem('cartCount', String(this.cartItems.length));
  }

  private updateWishlistCount() {
    this.wishlistCountSubject.next(this.wishlistItems.length);
    localStorage.setItem('wishlistCount', String(this.wishlistItems.length));
  }

  // Add more methods as needed...
}
