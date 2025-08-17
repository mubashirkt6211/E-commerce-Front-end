import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedComponent } from './featured/featured.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FeaturedComponent], // ✅ import child components
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {}
