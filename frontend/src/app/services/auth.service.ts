import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/auth'; // <-- Cambia aquí

  constructor(private readonly http: HttpClient) { }

  login(data: any){
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  register(data: any){
    return this.http.post(`${this.apiUrl}/register`, data);
  }
  // ...existing code...

  setToken(token: string){
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout(){
    localStorage.removeItem('token');
  }
}