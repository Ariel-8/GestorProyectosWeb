import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-crear-tarea',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-tarea.component.html'
})
export class CrearTareaComponent {
  task = {
    title: '',
    status: 'pendiente'
  };
  error = '';
  projectId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id');
  }

  onSubmit() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post(`http://localhost:3000/api/projects/${this.projectId}/tasks`, this.task, { headers })
      .subscribe({
        next: () => this.router.navigate([`/projects/${this.projectId}`]),
        error: (err) => {
          console.error(err);
          this.error = 'No se pudo crear la tarea. Intenta de nuevo.';
        }
      });
  }

  cancel() {
    this.router.navigate([`/projects/${this.projectId}`]);
  }
}
