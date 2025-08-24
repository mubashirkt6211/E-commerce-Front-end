import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isLoggedIn = false;
  userName: string = 'User'; 
  userRole: string = 'CUSTOMER'; // default

  constructor(private authService: AuthService) {
    this.authService.isAuthenticated$.subscribe((auth) => {
      this.isLoggedIn = auth;

      if (auth) {
        const token = this.authService.getToken();
        if (token) {
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            this.userName = payload.firstName || 'User';
            this.userRole = payload.role || 'CUSTOMER';
          } catch (error) {
            console.error('Error decoding JWT:', error);
          }
        }
      } else {
        this.userName = 'User';
        this.userRole = 'CUSTOMER';
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  // Helper functions to simplify template checks
  isCustomer() {
    return this.userRole === 'CUSTOMER' || this.userRole === 'BOTH';
  }

  isSeller() {
    return this.userRole === 'SELLER' || this.userRole === 'BOTH';
  }
}
