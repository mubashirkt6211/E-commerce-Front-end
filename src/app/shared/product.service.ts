import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export enum ShippingType {
  NORMAL = 'NORMAL',
  FAST = 'FAST',
  SUPERFAST = 'SUPERFAST'
}

export interface Category {
  id: number;
  name?: string;
}

export interface Product {
  id?: number;
  name: string;
  brand: string;
  description: string;
  quantity: number;
  price: number;
  discountPrice?: number;
  category: Category;          
  weight: number;
  shippingClass: ShippingType; 
  images?: string[];           
  colors: string[];
  sizes: string[];
  inStock: boolean;
  onSale: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/item';

  constructor(private http: HttpClient, private authService: AuthService) {}

  /** Generate Authorization headers */
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken() || '';
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  private handleTokenMissing<T>(): Observable<T> {
    return throwError(() => ({ status: 401, message: 'JWT token missing. Please login.' }));
  }

  /** Create a new product (FormData) */
  createProduct(productData: FormData): Observable<Product> {
    if (!this.authService.isLoggedIn()) return this.handleTokenMissing();
    return this.http.post<Product>(`${this.baseUrl}/create`, productData, { headers: this.getAuthHeaders() });
  }

  /** Get all products */
  getProducts(): Observable<Product[]> {
    if (!this.authService.isLoggedIn()) return this.handleTokenMissing();
    return this.http.get<Product[]>(`${this.baseUrl}/all`, { headers: this.getAuthHeaders() });
  }

  /** Get a product by ID */
  getProductById(id: number): Observable<Product> {
    if (!this.authService.isLoggedIn()) return this.handleTokenMissing();
    return this.http.get<Product>(`${this.baseUrl}/get/${id}`, { headers: this.getAuthHeaders() });
  }

  /** Delete a product */
  deleteProduct(id: number): Observable<void> {
    if (!this.authService.isLoggedIn()) return this.handleTokenMissing();
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`, { headers: this.getAuthHeaders() });
  }

  /** Update an existing product (FormData) */
  updateProduct(id: number, productData: FormData): Observable<Product> {
    if (!this.authService.isLoggedIn()) return this.handleTokenMissing();
    return this.http.put<Product>(`${this.baseUrl}/update/${id}`, productData, { headers: this.getAuthHeaders() });
  }

  /** Helper: convert Product object to FormData */
  static toFormData(product: Partial<Product>, files: File[] = []): FormData {
    const formData = new FormData();
    formData.append(
      'item',
      new Blob([JSON.stringify(product)], { type: 'application/json' })
    );
    files.forEach(file => formData.append('images', file));
    return formData;
  }
}
