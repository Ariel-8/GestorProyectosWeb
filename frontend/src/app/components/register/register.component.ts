import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [ CommonModule, FormsModule ],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  user = {
    email: '',
    password: ''
  };

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router){}

  register(){
    this.authService.register(this.user).subscribe({
      next: () => {
        this.successMessage = 'Registro exitoso, redirigiendo a inicio de sesión...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Error al registrar el usuario';
      }
    });
  }

  login(){
    this.router.navigate(['/login']);
  }

}
