import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/principales/login/login.component';
import { RegisterComponent } from './components/principales/register/register.component';
import { HomeComponent } from './components/principales/home/home.component';
import { AdmCenterComponent } from './components/administrador/adm-center/adm-center.component';
import { ProductFormComponent } from './components/administrador/product-form/product-form.component';
import { EditProductComponent } from './components/administrador/edit-product/edit-product.component';
import { BodegaComponent } from './components/administrador/bodega/bodega.component';
import { UserHomeComponent } from './components/usuarios/user-home/user-home.component';


export const routes: Routes = [
{

    path: 'login',
    component: LoginComponent

},

{

    path: 'register',
    component: RegisterComponent

},

{

    path: 'home',
    component: HomeComponent

},

{

    path: 'adminCenter',
    component: AdmCenterComponent

},

{
    path: 'productForm',
    component: ProductFormComponent
},

{
    path: 'edit-product/:id',
    component: EditProductComponent
}
,
{
    path: 'bodega',
    component: BodegaComponent
},

{
    path: 'userHome',
    component: UserHomeComponent
},

{
path: '', redirectTo: 'home', pathMatch: 'full'
},


];
