import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService, Category } from '../../shared/category.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  category: Category = { id: 0, name: '' }; // include id for update
  categories: Category[] = [];
  openForm = false;
  editingCategory: Category | null = null;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: data => (this.categories = data),
      error: err => console.error('Error loading categories', err)
    });
  }

  toggleForm(): void {
    if (this.editingCategory) {
      // Cancel edit
      this.resetForm();
    } else {
      this.openForm = !this.openForm;
    }
  }

  onSubmit(): void {
    if (this.editingCategory) {
      // Update category
      this.categoryService.updateCategory(this.category.id!, this.category).subscribe({
        next: res => {
          console.log('Category updated:', res);
          this.resetForm();
          this.loadCategories();
        },
        error: err => console.error('Error updating category', err)
      });
    } else {
      // Create category
      this.categoryService.createCategory(this.category).subscribe({
        next: res => {
          console.log('Category created:', res);
          this.resetForm();
          this.loadCategories();
        },
        error: err => console.error('Error creating category', err)
      });
    }
  }

  editCategory(cat: Category): void {
    this.category = { ...cat }; // copy values
    this.editingCategory = cat;
    this.openForm = true;
  }

  deleteCategory(id: number): void {
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        console.log('Category deleted');
        this.loadCategories();
      },
      error: err => console.error('Error deleting category', err)
    });
  }

  private resetForm(): void {
    this.category = { id: 0, name: '' };
    this.openForm = false;
    this.editingCategory = null;
  }
}
