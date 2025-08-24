import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
category = {
    name: '',
    image: null as File | null
  };

  previewUrl: string | ArrayBuffer | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.category.image = input.files[0];

      // Preview
      const reader = new FileReader();
      reader.onload = e => this.previewUrl = reader.result;
      reader.readAsDataURL(this.category.image);
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('name', this.category.name);
    if (this.category.image) {
      formData.append('image', this.category.image);
    }

    console.log('Form submitted:', formData);
    // 🔹 Here you call your backend API with HttpClient
  }
}
