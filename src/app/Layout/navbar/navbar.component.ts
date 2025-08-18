import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule } from '@angular/common';
import { LoginComponent } from "../../auth/login/login.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LoginComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
}
