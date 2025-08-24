import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  product = {
    name: '',
    brand: '',
    description: '',
    price: 0,
    discountPrice: 0,
    quantity: 0,
    category: '',
    images: [] as File[],
    colorSelection: {} as Record<string, boolean>,
    sizeSelection: {} as Record<string, boolean>,
    inStock: true,
    onSale: false
  };

  previewUrls: string[] = [];
  categories: any[] = []; // load from backend
 colors: string[] = [
  '#000000', // Black
  '#FFFFFF', // White
  '#FF0000', // Red
  '#00FF00', // Green
  '#0000FF', // Blue
  '#FFFF00', // Yellow
  '#FFA500', // Orange
  '#800080', // Purple
  '#00CED1', // Dark Turquoise
  '#FFC0CB'  // Pink
];

  sizes: string[] = ['S','M','L','XL','XXL'];


  // Load categories from backend


  // Handle multiple image files
  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.product.images = Array.from(input.files);

      // Previews
      this.previewUrls = [];
      this.product.images.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => this.previewUrls.push(reader.result as string);
        reader.readAsDataURL(file);
      });
    }
  }

  // Toggle color selection
  toggleColor(color: string) {
    this.product.colorSelection[color] = !this.product.colorSelection[color];
  }

  // Toggle size selection
  toggleSize(size: string) {
    this.product.sizeSelection[size] = !this.product.sizeSelection[size];
  }

  // Submit product form
  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('brand', this.product.brand);
    formData.append('description', this.product.description);
    formData.append('price', this.product.price.toString());
    if (this.product.discountPrice) formData.append('discountPrice', this.product.discountPrice.toString());
    formData.append('quantity', this.product.quantity.toString());
    formData.append('categoryId', this.product.category);
    formData.append('inStock', this.product.inStock.toString());
    formData.append('onSale', this.product.onSale.toString());

    // Append images
    this.product.images.forEach(file => formData.append('images', file));

    // Append selected colors and sizes
    const selectedColors = Object.keys(this.product.colorSelection).filter(c => this.product.colorSelection[c]);
    const selectedSizes = Object.keys(this.product.sizeSelection).filter(s => this.product.sizeSelection[s]);
    formData.append('colors', JSON.stringify(selectedColors));
    formData.append('sizes', JSON.stringify(selectedSizes));

  }
}
