import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FeaturedComponent } from './home/featured/featured.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProductDetailsComponent } from './Product/product-details/product-details.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { CategoryComponent } from './admin/category/category.component';
import { ProductManageComponent } from './admin/product-manage/product-manage.component';
import { DisplayProductComponent } from './Product/display-product/display-product.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'featured', component: FeaturedComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'details/:id', component: ProductDetailsComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'product-manage', component: ProductManageComponent },
  { path: 'display-product', component: DisplayProductComponent },




];
