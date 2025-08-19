import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Product {
  id: string;
  name: string;
  description?: string;
  brand: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  weight?: number;
  shippingClass?: string;
  reviewCount?: number;
  rating?: number;
  imageUrls: string[];       // ✅ updated
  color?: string[];          // ✅ multiple colors
  sizes?: string[];          // ✅ optional sizes
  inStock: boolean;
  onSale: boolean;
  isNew: boolean;
}

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  products: Product[] = [
    {
      id: 'p1',
      name: 'Air Zoom Pegasus 40',
      description: 'Lightweight running shoes with great cushioning.',
      brand: 'Nike',
      price: 12000,
      discountPrice: 9999,
      quantity: 100,
      weight: 1.8,
      shippingClass: 'Standard',
      reviewCount: 245,
      rating: 4.5,
      imageUrls: [
        'https://i.pinimg.com/1200x/79/5f/3e/795f3e9b8df5fffde4e1a0c5f84c923d.jpg',
        'https://i.pinimg.com/1200x/8c/e1/82/8ce1823b2e99f5eec87a901ed9b0703a.jpg',
        'https://i.pinimg.com/1200x/c7/7f/9e/c77f9eb907bfa6e4c93a4699d3953513.jpg',
      ],
      color: ['silver'],
      sizes: ['7', '8', '9', '10', '11'],
      inStock: true,
      onSale: true,
      isNew: true,
    },
    {
      id: 'p2',
      name: 'Ultraboost Light',
      description: 'High energy return running shoes.',
      brand: 'Adidas',
      price: 180,
      discountPrice: 150,
      quantity: 75,
      weight: 0.9,
      shippingClass: 'Express',
      reviewCount: 312,
      rating: 4.2,
      imageUrls: [
        'assets/images/adidas1.jpg',
        'assets/images/adidas2.jpg',
      ],
      color: ['White', 'Gray'],
      sizes: ['6', '7', '8', '9', '10'],
      inStock: true,
      onSale: true,
      isNew: false,
    },
    {
      id: 'p3',
      name: 'iPhone 15 Pro',
      description: 'The latest iPhone with A17 Pro chip.',
      brand: 'Apple',
      price: 999,
      discountPrice: 949,
      quantity: 40,
      weight: 0.25,
      shippingClass: 'Standard',
      reviewCount: 1500,
      rating: 4.8,
      imageUrls: [
        'assets/images/iphone1.jpg',
        'assets/images/iphone2.jpg',
      ],
      color: ['Titanium Gray', 'Silver', 'Black'],
      inStock: true,
      onSale: true,
      isNew: true,
    },
    {
      id: 'p4',
      name: 'WH-1000XM5',
      description: 'Industry leading noise cancelling headphones.',
      brand: 'Sony',
      price: 399,
      discountPrice: 349,
      quantity: 60,
      weight: 0.35,
      shippingClass: 'Standard',
      reviewCount: 970,
      rating: 4.6,
      imageUrls: [
        'assets/images/sony1.jpg',
        'assets/images/sony2.jpg',
      ],
      color: ['Black', 'Silver'],
      inStock: true,
      onSale: false,
      isNew: false,
    },
    {
      id: 'p5',
      name: 'Galaxy Watch 6',
      description: 'Health tracking and fitness smartwatch.',
      brand: 'Samsung',
      price: 329,
      discountPrice: 299,
      quantity: 80,
      weight: 0.15,
      shippingClass: 'Standard',
      reviewCount: 650,
      rating: 4.4,
      imageUrls: [
        'assets/images/galaxy1.jpg',
        'assets/images/galaxy2.jpg',
      ],
      color: ['Silver', 'Black', 'Gold'],
      sizes: ['S', 'M', 'L'],
      inStock: true,
      onSale: true,
      isNew: true,
    },
  ];

  @Input() product: Product = this.products[0]; // default product

  // State for selections
  selectedImage: string | null = null;
  selectedColor: string | null = null;
  selectedSize: string | null = null;

  // ✅ Event handlers
  onColorSelect(color: string) {
    this.selectedColor = color;
  }

  onSizeSelect(size: string) {
    this.selectedSize = size;
  }

  // Convert rating number (ex: 4.5) into array for star display
  getStars(rating: number): ('full' | 'half' | 'empty')[] {
    const stars: ('full' | 'half' | 'empty')[] = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push('full');
      } else if (rating >= i - 0.5) {
        stars.push('half');
      } else {
        stars.push('empty');
      }
    }
    return stars;
  }
}
