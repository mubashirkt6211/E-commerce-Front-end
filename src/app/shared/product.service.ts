import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  category: Category;          // must be an object {id, name?}
  weight: number;
  shippingClass: ShippingType; // single value
  images?: string[];           // URLs of uploaded images
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

  constructor(private http: HttpClient) {}

  /** Create a new product (JSON + files) */
  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/create`, productData);
  }

  /** Get all products */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/all`);
  }

  /** Get a product by ID */
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/get/${id}`);
  }

  /** Delete a product */
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  /** Update an existing product (JSON + files) */
  updateProduct(id: number, productData: FormData): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/update/${id}`, productData);
  }

  /** Helper: convert Product object to FormData */
  static toFormData(product: Partial<Product>, files: File[] = []): FormData {
    const formData = new FormData();

    // JSON body (product object)
    formData.append(
      'item',
      new Blob([JSON.stringify(product)], { type: 'application/json' })
    );

    // Attach image files
    files.forEach(file => formData.append('images', file));

    return formData;
  }
}
