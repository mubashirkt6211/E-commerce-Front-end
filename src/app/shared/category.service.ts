import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export interface Category {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:8080/api/category';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken() || '';
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  private handleTokenMissing<T>(): Observable<T> {
    return throwError(() => ({ status: 401, message: 'JWT token missing. Please login.' }));
  }

  createCategory(category: { name: string }): Observable<Category> {
    if (!this.authService.isLoggedIn()) return this.handleTokenMissing();
    return this.http.post<Category>(`${this.baseUrl}/create`, category, { headers: this.getAuthHeaders() });
  }

  getCategories(): Observable<Category[]> {
    if (!this.authService.isLoggedIn()) return this.handleTokenMissing();
    return this.http.get<Category[]>(`${this.baseUrl}/all`, { headers: this.getAuthHeaders() });
  }

  deleteCategory(id: number): Observable<any> {
    if (!this.authService.isLoggedIn()) return this.handleTokenMissing();
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { headers: this.getAuthHeaders() });
  }

  updateCategory(id: number, category: { name: string }): Observable<Category> {
    if (!this.authService.isLoggedIn()) return this.handleTokenMissing();
    return this.http.put<Category>(`${this.baseUrl}/update/${id}`, category, { headers: this.getAuthHeaders() });
  }

  getCategoryByName(name: string): Observable<Category> {
    if (!this.authService.isLoggedIn()) return this.handleTokenMissing();
    return this.http.get<Category>(`${this.baseUrl}/name/${name}`, { headers: this.getAuthHeaders() });
  }
}
