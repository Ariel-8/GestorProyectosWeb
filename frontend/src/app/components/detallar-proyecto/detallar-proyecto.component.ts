import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detallar-proyecto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detallar-proyecto.component.html',
  styleUrls: ['./detallar-proyecto.component.css']
})
export class DetallarProyectoComponent implements OnInit {
  project: any = null;
  tasks: any[] = [];
  progress = 0;
  editTaskId: number | null = null;
  editTask: any = {};

  constructor(
    private readonly route: ActivatedRoute,
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const projectId = this.route.snapshot.paramMap.get('id');

    // Obtener el proyecto
    this.http.get(`http://localhost:3000/api/proyectos/${projectId}`, { headers }).subscribe({
      next: (res: any) => {
        this.project = res;
        // Obtener las tareas del proyecto
        this.http.get(`http://localhost:3000/api/proyectos/${projectId}/tareas`, { headers }).subscribe({
          next: (tareas: any) => {
            this.tasks = Array.isArray(tareas) ? tareas : [];
            this.calculateProgress();
          },
          error: (err) => {
            this.tasks = [];
            this.calculateProgress();
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener el proyecto', err);
        this.router.navigate(['/dashboard']);
      }
    });
  }

  calculateProgress() {
    if (!Array.isArray(this.tasks) || this.tasks.length === 0) {
      this.progress = 0;
      return;
    }
    const finalizadas = this.tasks.filter(t => t.estado === 'completada').length;
    this.progress = Math.round((finalizadas / this.tasks.length) * 100);
  }

  updateStatus(task: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Envía todos los campos requeridos
    this.http.put(`http://localhost:3000/api/proyectos/tarea/${task.id}`, {
      nombre: task.nombre,
      descripcion: task.descripcion,
      estado: task.estado
    }, { headers })
      .subscribe({
        next: () => this.calculateProgress(),
        error: (err) => console.error('Error al actualizar tarea', err)
      });
  }

  goToNewTask() {
    this.router.navigate(['/crear-tarea', this.project.id]);
  }

  // --- Inline Edit ---
  startEdit(task: any) {
    this.editTaskId = task.id;
    this.editTask = { ...task }; // copia para edición
  }

  cancelEdit() {
    this.editTaskId = null;
    this.editTask = {};
  }

  saveEdit(task: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.put(`http://localhost:3000/api/proyectos/tarea/${task.id}`, {
      nombre: this.editTask.nombre,
      descripcion: this.editTask.descripcion,
      estado: this.editTask.estado
    }, { headers })
      .subscribe({
        next: () => {
          Object.assign(task, this.editTask);
          this.editTaskId = null;
          this.editTask = {};
        },
        error: (err) => alert('Error al editar la tarea')
      });
  }

  eliminarTarea(task: any) {
    if (!confirm('¿Seguro que deseas eliminar esta tarea?')) return;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.delete(`http://localhost:3000/api/proyectos/tarea/${task.id}`, { headers })
      .subscribe({
        next: () => {
          this.tasks = this.tasks.filter(t => t.id !== task.id);
          this.calculateProgress();
        },
        error: (err) => alert('Error al eliminar la tarea')
      });
  }
}