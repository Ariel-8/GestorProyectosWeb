import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProyectoService } from '../../services/proyecto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-proyectos',
  styleUrls: ['./crear-proyectos.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-proyectos.component.html'
})
export class CrearProyectosComponent {
  proyecto = {
    nombre: '',
    descripcion: ''
  };
  error = '';

  constructor(
    private readonly proyectoService: ProyectoService,
    private readonly router: Router
  ) {}

  onSubmit() {
    this.proyectoService.crearProyecto(this.proyecto).subscribe({
      next: () => { this.router.navigate(['/dashboard']); },
      error: () => this.error = 'No se pudo crear el proyecto. Inténtalo de nuevo.'
    });
  }

  cancelar() {
    this.router.navigate(['/dashboard']);
  }
}