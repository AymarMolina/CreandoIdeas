import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/authentication/login/login.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { Component } from '@angular/core';
import { ProductsComponent } from './components/products/products.component';
import { PurchaseComponent } from './components/purchase/purchase.component';

export const routes: Routes = [
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    {path:'login',component:LoginComponent},
    {path:'inicio',component:LayoutComponent,
        children:[
            { path: '', component: HomeComponent },
            {path:'productos',component:ProductsComponent},
            {path:'carro',component:PurchaseComponent}
        ]}

];
export const AppRoutes=RouterModule.forRoot(routes)