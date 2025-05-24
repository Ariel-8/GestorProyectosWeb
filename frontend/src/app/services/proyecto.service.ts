import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  private readonly apiUrl = 'http://localhost:3000/api/proyectos'; 

  constructor(private readonly http: HttpClient) { }

  obtenerProyectos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearProyecto(proyecto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, proyecto);
  }

  obtenerProyectoPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  eliminarProyecto(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`http://localhost:3000/api/proyectos/${id}`, { headers });
  }

  actualizarProyecto(id: number, proyecto: any): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.put(`${this.apiUrl}/${id}`, proyecto, { headers });
}

archivarProyecto(id: number): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.put(`${this.apiUrl}/${id}/archivar`, {}, { headers });
}

}