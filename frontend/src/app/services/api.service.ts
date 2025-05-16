import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/tareas';

  constructor(private http: HttpClient) { }

  getTareas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearTarea(tarea: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, tarea);
  }

  obtenerTareaPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  actualizarTareaPorId(id: number, tarea: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, tarea);
  }

  eliminarTareaPorId(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
}