import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  step = 1; // <-- current step of the multi-step form

  product = {
    name: '',
    brand: '',
    description: '',
    price: 0,
    discountPrice: 0,
    quantity: 0,
    category: '',              // Category ID
    weight: 0,
    shippingTypes: [] as string[], // Multiple shipping options
    images: [] as File[],
    colorSelection: {} as Record<string, boolean>,
    sizeSelection: {} as Record<string, boolean>,
    inStock: true,
    onSale: false
  };

  previewUrls: string[] = [];
  categories: Category[] = [];
  loading = false;
  errorMessage = '';

  colors: string[] = [
    '#000000','#FFFFFF','#FF0000','#00FF00','#0000FF',
    '#FFFF00','#FFA500','#800080','#00CED1','#FFC0CB'
  ];
  sizes: string[] = ['S','M','L','XL','XXL'];
  availableShippingTypes: string[] = ['STANDARD', 'NORMAL', 'SUPERFAST'];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  /** Load categories from backend */
  loadCategories(): void {
    this.http.get<Category[]>('http://localhost:8080/api/category/all')
      .subscribe({
        next: data => this.categories = data,
        error: err => {
          console.error('Failed to load categories', err);
          this.errorMessage = 'Could not load categories';
        }
      });
  }

  /** Handle file input with max 3 images */
  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    let filesArray = Array.from(input.files);
    if (filesArray.length > 3) {
      filesArray = filesArray.slice(0, 3);
      alert('You can only upload up to 3 images.');
    }

    this.product.images = filesArray;
    this.previewUrls = [];

    filesArray.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => this.previewUrls.push(reader.result as string);
      reader.readAsDataURL(file);
    });
  }

  /** Toggle color selection */
  toggleColor(color: string) {
    this.product.colorSelection[color] = !this.product.colorSelection[color];
  }

  /** Toggle size selection */
  toggleSize(size: string) {
    this.product.sizeSelection[size] = !this.product.sizeSelection[size];
  }

  /** Toggle shipping type for checkbox or button */
  toggleShippingTypeButton(type: string) {
    if (this.product.shippingTypes.includes(type)) {
      this.product.shippingTypes = this.product.shippingTypes.filter(t => t !== type);
    } else {
      this.product.shippingTypes.push(type);
    }
  }

  /** Toggle shipping type from checkbox input */
  toggleShippingType(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    if (checkbox.checked) {
      if (!this.product.shippingTypes.includes(value)) this.product.shippingTypes.push(value);
    } else {
      this.product.shippingTypes = this.product.shippingTypes.filter(t => t !== value);
    }
  }

  /** Navigate to next step */
  nextStep() {
    if (this.step < 3) this.step++;
  }

  /** Navigate to previous step */
  prevStep() {
    if (this.step > 1) this.step--;
  }

  /** Submit the form */
  onSubmit(): void {
    if (!this.product.name || !this.product.category || !this.product.shippingTypes.length) {
      this.errorMessage = 'Name, category, and at least one shipping type are required';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('brand', this.product.brand);
    formData.append('description', this.product.description);
    formData.append('price', this.product.price.toString());
    if (this.product.discountPrice) formData.append('discountPrice', this.product.discountPrice.toString());
    formData.append('quantity', this.product.quantity.toString());
    formData.append('weight', this.product.weight.toString());
    formData.append('categoryId', this.product.category);
    formData.append('inStock', this.product.inStock.toString());
    formData.append('onSale', this.product.onSale.toString());

    // Images
    this.product.images.forEach(file => formData.append('images', file));

    // Colors and sizes
    const selectedColors = Object.keys(this.product.colorSelection).filter(c => this.product.colorSelection[c]);
    const selectedSizes = Object.keys(this.product.sizeSelection).filter(s => this.product.sizeSelection[s]);
    formData.append('colors', JSON.stringify(selectedColors));
    formData.append('sizes', JSON.stringify(selectedSizes));

    // Shipping types
    formData.append('shippingTypes', JSON.stringify(this.product.shippingTypes));

    // TODO: submit to backend
    // this.http.post('http://localhost:8080/api/item/create', formData).subscribe({...});
    console.log('FormData to submit:', formData);

    this.loading = false;
    this.resetForm();
  }

  /** Reset form */
  resetForm(): void {
    this.product = {
      name: '',
      brand: '',
      description: '',
      price: 0,
      discountPrice: 0,
      quantity: 0,
      category: '',
      weight: 0,
      shippingTypes: [],
      images: [],
      colorSelection: {},
      sizeSelection: {},
      inStock: true,
      onSale: false
    };
    this.previewUrls = [];
    this.errorMessage = '';
    this.step = 1;
    this.loading = false;
  }
}
