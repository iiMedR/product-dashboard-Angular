import { Routes } from '@angular/router';
import { Products } from './pages/products/products';
import { ProductForm } from './pages/product-form/product-form';

export const routes: Routes = [
    {
        path: "",
        redirectTo: 'products',
        pathMatch: 'full'
    },
    {
        path: 'products',
        component: Products
    },
    {
        path: 'products/new',
        component: ProductForm
    },
    {
        path: '**',
        redirectTo: 'products'
    }
];
