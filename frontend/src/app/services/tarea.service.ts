import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private readonly apiUrl = 'http://localhost:3000/api/proyectos';

  constructor(private readonly http: HttpClient) {}

  crearTarea(proyectoId: string, tarea: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/${proyectoId}/tareas`, tarea, { headers });
  }
}