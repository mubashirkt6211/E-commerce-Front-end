import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService, Product } from '../../shared/product.service';
import { CategoryService, Category } from '../../shared/category.service';

interface UpdateProductDTO {
  id: number;
  name: string;
  brand: string;
  category: { id: number };
  price: number;
  discountPrice?: number;
  quantity: number;
  onSale: boolean;
  inStock: boolean;
}

@Component({
  selector: 'app-product-manage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.css'],
  providers: [CurrencyPipe]
})
export class ProductManageComponent implements OnInit {

  products: Product[] = [];
  categories: Category[] = [];
  loading = false;
  errorMessage = '';

  editingProduct: Product | null = null;
  editedValues: UpdateProductDTO | null = null;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: data => {
        this.products = data;
        this.errorMessage = '';
      },
      error: err => {
        console.error('Error loading products:', err);
        this.errorMessage = (err.status === 401 || err.status === 403)
          ? 'Unauthorized! Please login.'
          : 'Failed to load products. Please try again later.';
      },
      complete: () => this.loading = false
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: data => this.categories = data,
      error: err => console.error('Error loading categories:', err)
    });
  }

  startEdit(product: Product) {
    this.editingProduct = product;
    this.editedValues = {
      id: product.id!,
      name: product.name,
      brand: product.brand,
      category: { id: product.category?.id || 0 },
      price: product.price,
      discountPrice: product.discountPrice,
      quantity: product.quantity,
      onSale: product.onSale,
      inStock: product.inStock
    };
    setTimeout(() => document.getElementById('nameInput')?.focus(), 0);
  }

  cancelEdit() {
    this.editingProduct = null;
    this.editedValues = null;
    this.errorMessage = '';
  }

  saveEdit(form: NgForm) {
    if (!this.editedValues || !form.valid) return;

    // ✅ Send JSON directly instead of FormData
    this.productService.updateProduct(this.editedValues.id, this.editedValues).subscribe({
      next: () => {
        this.showToast('✅ Product updated successfully');
        this.loadProducts();
        this.cancelEdit();
      },
      error: err => {
        console.error('Error updating product:', err);
        this.showToast('❌ Failed to update product');
      }
    });
  }

  deleteProduct(id: number) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.showToast('🗑️ Product deleted successfully');
        this.loadProducts();
      },
      error: err => {
        console.error('Error deleting product:', err);
        this.showToast((err.status === 401 || err.status === 403)
          ? 'Unauthorized! Please login.'
          : '❌ Failed to delete product');
      }
    });
  }



  showToast(message: string) {
    alert(message); // Replace with a proper toast library if needed
  }
}
