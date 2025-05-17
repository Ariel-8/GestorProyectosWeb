import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'crear-proyectos',
  styleUrls: ['./crear-proyectos.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-proyectos.component.html'
})
export class ProjectFormComponent {
  project = {
    name: '',
    description: ''
  };
  error = '';

  constructor(private readonly http: HttpClient, private readonly router: Router) {}

  onSubmit() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post('http://localhost:3000/api/projects', this.project, { headers })
      .subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.error = 'No se pudo crear el proyecto. Inténtalo de nuevo.';
          console.error(err);
        }
      });
  }

  cancel() {
    this.router.navigate(['/dashboard']);
  }
}
