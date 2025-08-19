import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

export interface Product {
  id: string;
  brand: string;
  name: string;
  category?: string;
  descrption?: string;
  imageUrl: string;
  price: number;
  discountPrice?: number;
  isNew?: boolean;
}

@Component({
  selector: 'app-featured',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css']
})
export class FeaturedComponent {

  // If you want ONE product passed from parent
  @Input() product!: Product;

  // If you want to keep local sample data (multiple products)
  products: Product[] = [
    {
      id: 'p1',
      brand: 'Nike',
      name: 'Air Zoom Pegasus 40',
      category: 'Shoes',
      descrption: 'Lightweight running shoes with great cushioning.',
      imageUrl: 'https://i.pinimg.com/1200x/49/5a/5d/495a5d4a3342e8de8a824fa15d333545.jpg',
      price: 120,
      discountPrice: 99,
      isNew: true,
    },
    {
      id: 'p2',
      brand: 'Adidas',
      name: 'Ultraboost Light',
      category: 'Shoes',
      descrption: 'High energy return running shoes.',
      imageUrl: 'https://i.pinimg.com/736x/30/87/f2/3087f22cf2fe64fde08a0447efe20559.jpg',
      price: 180,
      discountPrice: 150,
      isNew: false,
    },
      {
      id: 'p2',
      brand: 'Adidas',
      name: 'Ultraboost Light',
      category: 'Shoes',
      descrption: 'High energy return running shoes.',
      imageUrl: 'https://i.pinimg.com/736x/30/87/f2/3087f22cf2fe64fde08a0447efe20559.jpg',
      price: 180,
      discountPrice: 150,
      isNew: false,
    },
      {
      id: 'p2',
      brand: 'Adidas',
      name: 'Ultraboost Light',
      category: 'Shoes',
      descrption: 'High energy return running shoes.',
      imageUrl: 'https://i.pinimg.com/736x/30/87/f2/3087f22cf2fe64fde08a0447efe20559.jpg',
      price: 180,
      discountPrice: 150,
      isNew: false,
    },
    {
      id: 'p3',
      brand: 'Apple',
      name: 'iPhone 15 Pro',
      category: 'Electronics',
      descrption: 'The latest iPhone with A17 Pro chip.',
      imageUrl: 'https://i.pinimg.com/736x/9d/00/06/9d00069f49938b91592f53a4e6fb800f.jpg',
      price: 999,
      discountPrice: 949,
      isNew: true,
    },
    {
      id: 'p4',
      brand: 'Sony',
      name: 'WH-1000XM5',
      category: 'Headphones',
      descrption: 'Industry leading noise cancelling headphones.',
      imageUrl: 'https://i.pinimg.com/1200x/14/a3/86/14a386765086406a68aa974e1a252108.jpg',
      price: 399,
      discountPrice: 349,
      isNew: false,
    },
    {
      id: 'p5',
      brand: 'Samsung',
      name: 'Galaxy Watch 6',
      category: 'Smartwatch',
      descrption: 'Health tracking and fitness smartwatch.',
      imageUrl: 'https://i.pinimg.com/736x/23/8d/79/238d798b99a26980c08e731b8f3ae326.jpg',
      price: 329,
      discountPrice: 299,
      isNew: true,
    },
  ];
}
