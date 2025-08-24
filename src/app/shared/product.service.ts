import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  quantity: number;
  price: number;
  discountPrice: number;
  category: string; // Category ID
  weight: number;
  shippingTypes: string[]; // Multiple shipping options
  images: string[]; // URLs of images
  colors: string[]; // Selected colors
  sizes: string[];  // Selected sizes
  inStock: boolean;
  onSale: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/item';

  constructor(private http:HttpClient) { }

  createProduct(productData: FormData) {
    return this.http.post<Product>(`${this.baseUrl}/create`, productData);
  }

  getProducts() {
    return this.http.get<Product[]>(`${this.baseUrl}/all`);
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${this.baseUrl}/get/id/${id}`);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  updateProduct(id: number, productData: FormData) {
    return this.http.put<Product>(`${this.baseUrl}/update/${id}`, productData);
  }

  
}
