import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  login(data: any){
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  register(data: any){
    return this.http.post(`${this.apiUrl}/register`, data);
  }

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