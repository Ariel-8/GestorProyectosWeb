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

  usuario = {
    nombre_usuario: '',
    correo: '',
    contrasena: ''
  };

  mensajeError: string | null = null;
  mensajeExito: string | null = null;

  constructor(private readonly authService: AuthService, private readonly router: Router){}

  registrar(){
    this.authService.register(this.usuario).subscribe({
      next: () => {
        this.mensajeExito = 'Registro exitoso, redirigiendo a inicio de sesión...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (err) => {
        this.mensajeError = err.error.message ?? 'Error al registrar el usuario';
      }
    });
  }

  login(){
    this.router.navigate(['/login']);
  }

}