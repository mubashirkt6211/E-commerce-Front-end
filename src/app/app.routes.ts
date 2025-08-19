import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FeaturedComponent } from './home/featured/featured.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProductDetailsComponent } from './Product/product-details/product-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'featured', component: FeaturedComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'details/:id', component: ProductDetailsComponent },






];
