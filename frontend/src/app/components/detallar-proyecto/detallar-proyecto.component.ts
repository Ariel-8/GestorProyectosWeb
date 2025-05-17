import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-detallar-proyecto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detallar-proyecto.component.html'
})
export class DetallarProyectoComponent implements OnInit {
  project: any = null;
  tasks: any[] = [];
  progress = 0;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const projectId = this.route.snapshot.paramMap.get('id');

    this.http.get(`http://localhost:3000/api/projects/${projectId}`, { headers }).subscribe({
      next: (res: any) => {
        this.project = res.project;
        this.tasks = res.tasks;
        this.calculateProgress();
      },
      error: (err) => {
        console.error('Error al obtener el proyecto', err);
        this.router.navigate(['/dashboard']);
      }
    });
  }

  calculateProgress() {
    if (this.tasks.length === 0) {
      this.progress = 0;
      return;
    }
    const finalizadas = this.tasks.filter(t => t.status === 'finalizada').length;
    this.progress = Math.round((finalizadas / this.tasks.length) * 100);
  }

  updateStatus(task: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.put(`http://localhost:3000/api/tasks/${task.id}`, { status: task.status }, { headers })
      .subscribe({
        next: () => this.calculateProgress(),
        error: (err) => console.error('Error al actualizar tarea', err)
      });
  }

  goToNewTask() {
    this.router.navigate([`/projects/${this.project.id}/tasks/create`]);
  }
}
