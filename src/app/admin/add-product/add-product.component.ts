import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductService, ShippingType } from '../../shared/product.service';
import { CategoryService, Category } from '../../shared/category.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; // ✅ Import ToastrService

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  step = 1;

  product = {
    name: '',
    brand: '',
    description: '',
    price: 0,
    discountPrice: 0,
    quantity: 0,
    category: '', 
    weight: 0,
    shippingTypes: [] as ShippingType[],   
    images: [] as File[],
    colors: [] as string[],
    sizes: [] as string[],
    inStock: true,
    onSale: false
  };

  previewUrls: string[] = [];
  categories: Category[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';

  selectedColor: string = '#000000';
  newSize: string = '';

  availableShippingTypes: ShippingType[] = [
    ShippingType.NORMAL,
    ShippingType.FAST,
    ShippingType.SUPERFAST
  ];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private toastr: ToastrService // ✅ Inject ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  // ✅ Categories
  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: data => this.categories = data,
      error: err => this.handleError(err, 'loading categories')
    });
  }

  // ✅ Images
  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    let filesArray = Array.from(input.files);

    if (filesArray.length > 3) {
      filesArray = filesArray.slice(0, 3);

      // ✅ Show toast instead of alert
      this.toastr.warning('⚠️ You can only upload up to 3 images.', 'Warning');
    }

    this.product.images = filesArray;

    this.previewUrls.forEach(url => URL.revokeObjectURL(url));
    this.previewUrls = filesArray.map(file => URL.createObjectURL(file));
  }

  // ✅ Colors
  addColor() {
    if (this.selectedColor && !this.product.colors.includes(this.selectedColor)) {
      this.product.colors.push(this.selectedColor);
      this.selectedColor = '#000000';
    }
  }

  removeColor(color: string) {
    this.product.colors = this.product.colors.filter(c => c !== color);
  }

  // ✅ Sizes
  addSize() {
    const size = this.newSize.trim().toUpperCase();
    if (size && !this.product.sizes.includes(size)) {
      this.product.sizes.push(size);
      this.newSize = '';
    }
  }

  removeSize(size: string) {
    this.product.sizes = this.product.sizes.filter(s => s !== size);
  }

  // ✅ Shipping
  toggleShippingType(type: ShippingType) {
    if (this.product.shippingTypes.includes(type)) {
      this.product.shippingTypes = this.product.shippingTypes.filter(t => t !== type);
    } else {
      this.product.shippingTypes.push(type);
    }
  }

  // ✅ Submit
  onSubmit(): void {
    if (!this.product.name || !this.product.category || this.product.shippingTypes.length === 0) {
      this.toastr.error('❌ Name, category, and at least one shipping option are required', 'Error');
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const productPayload = {
      name: this.product.name,
      brand: this.product.brand,
      description: this.product.description,
      price: this.product.price,
      discountPrice: this.product.discountPrice,
      quantity: this.product.quantity,
      weight: this.product.weight,
      categoryId: +this.product.category,
      inStock: this.product.inStock,
      onSale: this.product.onSale,
      colors: this.product.colors,
      sizes: this.product.sizes,
      shippingClasses: this.product.shippingTypes
    };

    const formData = ProductService.toFormData(productPayload, this.product.images);

    this.productService.createProduct(formData).subscribe({
      next: () => {
        this.toastr.success('✅ Product created successfully!', 'Success');
        this.resetForm();
        this.loading = false;
        this.router.navigate(['/product-manage']);
      },
      error: err => this.handleError(err, 'creating product')
    });
  }

  // ✅ Reset form
  resetForm(): void {
    this.product = {
      name: '', brand: '', description: '', price: 0, discountPrice: 0,
      quantity: 0, category: '', weight: 0, shippingTypes: [],
      images: [], colors: [], sizes: [],
      inStock: true, onSale: false
    };

    this.previewUrls.forEach(url => URL.revokeObjectURL(url));
    this.previewUrls = [];

    this.errorMessage = '';
    this.successMessage = '';
    this.step = 1;
    this.loading = false;
    this.selectedColor = '#000000';
    this.newSize = '';
  }

  // ✅ Unified error handler with toast
  private handleError(err: any, action: string) {
    console.error(`Error ${action}:`, err);
    this.loading = false;

    if (err.status === 401 || err.status === 403) {
      this.toastr.error('Unauthorized! Please login.', 'Error');
      this.router.navigate(['/login']);
    } else {
      this.toastr.error(`❌ Failed ${action}. Try again.`, 'Error');
    }
  }
}
