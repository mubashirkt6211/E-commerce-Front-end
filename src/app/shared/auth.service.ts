import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export interface AuthResponse {
  message: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:8080/auth';
  private readonly jwtKey = 'jwt_token';
  private isBrowser: boolean;

  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  isAuthenticated$: Observable<boolean>;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, credentials).pipe(
      tap(response => {
        this.storeToken(response.token);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  register(user: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, user).pipe(
      tap(response => {
        this.storeToken(response.token);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  private storeToken(token: string): void {
    if (this.isBrowser && token) {
      localStorage.setItem(this.jwtKey, token);
    }
  }

  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem(this.jwtKey) : null;
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.jwtKey);
    }
    this.isAuthenticatedSubject.next(false);
  }

  isLoggedIn(): boolean {
    return this.isBrowser ? !!this.getToken() : false;
  }

  private hasToken(): boolean {
    return this.isBrowser ? !!localStorage.getItem(this.jwtKey) : false;
  }
}
