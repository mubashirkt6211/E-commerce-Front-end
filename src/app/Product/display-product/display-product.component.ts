import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, ProductService } from '../../shared/product.service';
import { catchError, finalize, of, Subject, takeUntil } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-display-product',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './display-product.component.html',
  styleUrls: ['./display-product.component.css'],
})
export class DisplayProductComponent implements OnInit, OnDestroy {
  products: (Product & { imageUrl: string })[] = []; 
  loading = false;
  errorMessage = '';
  private destroy$ = new Subject<void>();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  fetchProducts(): void {
    this.loading = true;
    this.errorMessage = '';

    this.productService.getProducts()
      .pipe(
        catchError(err => {
          console.error(err);
          this.errorMessage = 'Failed to load products.';
          return of([]); 
        }),
        takeUntil(this.destroy$),
        finalize(() => (this.loading = false))
      )
      .subscribe(res => {
        this.products = (res || []).map(product => ({
          ...product,
          price: Number(product.price),
          discountPrice: product.discountPrice != null ? Number(product.discountPrice) : undefined,
          imageUrls: product.imageUrls ?? [],
          imageUrl: product.imageUrls?.length ? 'http://localhost:8080' + product.imageUrls[0] : ''
        }));
      });
  }
}
