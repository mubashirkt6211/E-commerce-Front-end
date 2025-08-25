import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProductService, Product } from '../../shared/product.service';
import { CategoryService, Category } from '../../shared/category.service';

@Component({
  selector: 'app-product-manage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.css'],
  providers: [CurrencyPipe]
})
export class ProductManageComponent implements OnInit {

  products: Product[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: data => {
        this.products = data;
        this.loading = false;
      },
      error: err => {
        console.error('Error loading products:', err);
        if (err.status === 401 || err.status === 403) {
          this.errorMessage = 'Unauthorized! Please login.';
          alert(this.errorMessage);
        } else {
          this.errorMessage = 'Failed to load products';
        }
        this.loading = false;
      }
    });
  }

  formatPrice(value: number): string {
    return this.currencyPipe.transform(value, 'USD', 'symbol', '1.2-2', 'en-US') ?? '';
  }

  editProduct(product: Product) {
    // Replace with your actual edit logic / route
    alert(`Edit product: ${product.name}`);
  }

  deleteProduct(id: number) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        alert('Product deleted successfully');
        this.loadProducts();
      },
      error: err => {
        console.error('Error deleting product:', err);
        if (err.status === 401 || err.status === 403) {
          alert('Unauthorized! Please login.');
        } else {
          alert('Failed to delete product.');
        }
      }
    });
  }
}
