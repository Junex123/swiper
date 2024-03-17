import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { HomeComponent } from './home/home.component';
import { SwiperComponent } from './swiper/swiper.component';
import { LoginsignupComponent } from './loginsignup/loginsignup.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { BlogComponent } from './Admin/blog/blog.component';
import { ProductComponent } from './Admin/product/product.component';
import { UserComponent } from './Admin/user/user.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'detail',component:DetailComponent},
  {path:'swiper',component:SwiperComponent},
  {path:'login&signup',component:LoginsignupComponent},
  {path:'admindashboard',component:DashboardComponent},
  {path:'manageblog',component:BlogComponent},
  {path:'manageproduct',component:ProductComponent},
  {path:'manageuser',component:UserComponent},
  {path:'cart',component:CartComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
