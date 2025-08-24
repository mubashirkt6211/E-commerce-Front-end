import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Category {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:8080/api/category';

  constructor(private http: HttpClient) {}

  // ✅ Create Category
  createCategory(category: { name: string }): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}/create`, category);
  }

  // ✅ Get All Categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/all`);
  }

  // ✅ Delete Category
  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  // ✅ Update Category
  updateCategory(id: number, category: { name: string }): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/update/${id}`, category);
  }

  // ✅ Get Category By Name
  getCategoryByName(name: string): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/name/${name}`);
  }
}
