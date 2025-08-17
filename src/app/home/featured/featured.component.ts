import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Product {
pictures: any;
  publicId: string;
  brand: string;
  name: string;
  imageUrl: string;
  price: number;
  discountPrice?: number;
  isNew?: boolean;
  size?: string;
}

@Component({
  selector: 'app-featured',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css']
})
export class FeaturedComponent {
  @Input() product: Product = {
    publicId: 'p123',
    brand: 'Apple',
    name: 'AirPods - M',
    imageUrl: 'https://i.pinimg.com/1200x/d1/cf/f6/d1cff6e7225eaa091db024ae75157a10.jpg',
    price: 800,
    discountPrice: 700,
    isNew: true,
    size: 'M',
    pictures: undefined
  };
featuredProductQuery: any;
card: any;
}
