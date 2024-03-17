import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductComponent } from './product/product.component';
import { DetailComponent } from './detail/detail.component';
import { LandingComponent } from './landing/landing.component';
import { authInterceptorProviders } from './service/auth.interceptor';
import { FooterComponent } from './footer/footer.component';
import { SwiperComponent } from './swiper/swiper.component';
import { LoginsignupComponent } from './loginsignup/loginsignup.component';

import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { UserComponent } from './Admin/user/user.component';
import { BlogComponent } from './Admin/blog/blog.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ProductComponent,
    DetailComponent,
    LandingComponent,
    FooterComponent,
    SwiperComponent,
    LoginsignupComponent,

    DashboardComponent,
    UserComponent,
    BlogComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
