import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./Layout/navbar/navbar.component";
import { FooterComponent } from "./Layout/footer/footer.component";
import { LoginComponent } from "./auth/login/login.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent,FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-end';
  constructor(public router: Router) {}

  hideLayout(): boolean {
    return this.router.url === '/login' || this.router.url === '/register';
  }
}
