import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  projects: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any[]>('http://localhost:3000/api/projects', { headers })
      .subscribe({
        next: data => {
          this.projects = data;
        },
        error: err => {
          console.error('Error al obtener proyectos', err);
          if (err.status === 401) {
            this.router.navigate(['/login']);
          }
        }
      });
  }

  viewDetails(projectId: number) {
    this.router.navigate(['/projects', projectId]);
  }

  goToCreateProject() {
    this.router.navigate(['/projects/create']);
  }
}
