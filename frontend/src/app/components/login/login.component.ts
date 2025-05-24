import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  credentials = {
    correo: '',
    contrasena: ''
  };

  errorMessage: string | null = null;

  constructor(private readonly authService: AuthService, private readonly router: Router){}

  login(){
    this.authService.login(this.credentials).subscribe({
      next: (res: any) => {
        this.authService.setToken(res.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = err.error.message ?? 'Error al iniciar sesión';
      }
    });
  }

  register(){
    this.router.navigate(['/register']);
  }

}
