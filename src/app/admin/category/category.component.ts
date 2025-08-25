import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService, Category } from '../../shared/category.service';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  category: Category = { id: 0, name: '' };
  categories: Category[] = [];
  openForm = false;
  editingCategory: Category | null = null;

  constructor(
    private categoryService: CategoryService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      alert('You are not logged in. Redirecting to login.');
      this.router.navigate(['/login']);
      return;
    }
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: data => this.categories = data,
      error: err => this.handleAuthError(err, 'loading categories')
    });
  }

  toggleForm(): void {
    if (this.editingCategory) {
      this.resetForm();
    } else {
      this.openForm = !this.openForm;
    }
  }

  onSubmit(): void {
    if (!this.category.name.trim()) {
      alert('Category name cannot be empty');
      return;
    }

    if (this.editingCategory) {
      this.categoryService.updateCategory(this.category.id!, this.category).subscribe({
        next: res => {
          this.resetForm();
          this.loadCategories();
        },
        error: err => this.handleAuthError(err, 'updating category')
      });
    } else {
      this.categoryService.createCategory(this.category).subscribe({
        next: res => {
          this.resetForm();
          this.loadCategories();
        },
        error: err => this.handleAuthError(err, 'creating category')
      });
    }
  }

  editCategory(cat: Category): void {
    this.category = { ...cat };
    this.editingCategory = cat;
    this.openForm = true;
  }

  deleteCategory(id: number): void {
    if (!confirm('Are you sure you want to delete this category?')) return;

    this.categoryService.deleteCategory(id).subscribe({
      next: () => this.loadCategories(),
      error: err => this.handleAuthError(err, 'deleting category')
    });
  }

  private resetForm(): void {
    this.category = { id: 0, name: '' };
    this.openForm = false;
    this.editingCategory = null;
  }

  private handleAuthError(err: any, action: string): void {
    console.error(`Error ${action}:`, err);
    if (err.status === 401 || err.status === 403) {
      alert('Unauthorized! Please login again.');
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}
