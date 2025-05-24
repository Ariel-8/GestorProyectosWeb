import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TareaService } from '../../services/tarea.service';

@Component({
  selector: 'app-crear-tarea',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-tarea.component.html'
})
export class CrearTareaComponent {
  task = {
    nombre: '',
    descripcion: '',
    estado: 'pendiente',
    fecha_limite: ''
  };
  error = '';
  projectId: string | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly tareaService: TareaService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('proyectoId');
  }

  onSubmit() {
    if (!this.projectId) return;
    this.tareaService.crearTarea(this.projectId, this.task)
      .subscribe({
        next: () => { this.router.navigate([`/detallar-proyecto`, this.projectId]); },
        error: (err) => {
          console.error(err);
          this.error = 'No se pudo crear la tarea. Intenta de nuevo.';
        }
      });
  }

  cancel() {
    if (this.projectId) {
      this.router.navigate([`/detallar-proyecto`, this.projectId]);
    }
  }
}