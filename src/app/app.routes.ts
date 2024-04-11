import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'product/:id',
    loadComponent:()=> 
    import('./productdetail/productdetail.component').then((c)=>c.ProductdetailComponent)},

{path:'cart',
    loadComponent:()=> 
    import('./cartitem/cartitem.component').then((c)=>c.CartitemComponent)},



{path:'productform',
    loadComponent:()=>
    import('./productform/productform.component').then((c)=>c.ProductformComponent)}



];
