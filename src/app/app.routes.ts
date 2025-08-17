import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FeaturedComponent } from './home/featured/featured.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'featured', component: FeaturedComponent },




];
