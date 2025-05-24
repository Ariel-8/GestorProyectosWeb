import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProyectoService } from '../../services/proyecto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  proyectos: any[] = [];
  editProyectoId: number | null = null;
  editProyecto: any = {};

  constructor(
    private readonly proyectoService: ProyectoService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.cargarProyectos();
  }

  cargarProyectos(): void {
    this.proyectoService.obtenerProyectos().subscribe({
      next: (data) => this.proyectos = data,
      error: () => this.proyectos = []
    });
  }

  irACrearProyecto(): void {
    this.router.navigate(['/crear-proyectos']);
  }

  verDetalles(idProyecto: number): void {
    this.router.navigate(['/detallar-proyecto', idProyecto]);
  }

  startEdit(proyecto: any): void {
    this.editProyectoId = proyecto.id;
    this.editProyecto = { ...proyecto };
  }

  cancelEdit(): void {
    this.editProyectoId = null;
    this.editProyecto = {};
  }

  saveEdit(proyecto: any): void {
    this.proyectoService.actualizarProyecto(proyecto.id, this.editProyecto).subscribe({
      next: () => {
        Object.assign(proyecto, this.editProyecto);
        this.editProyectoId = null;
        this.editProyecto = {};
      },
      error: () => alert('Error al editar el proyecto')
    });
  }

  eliminarProyecto(idProyecto: number): void {
    if (!confirm('¿Seguro que deseas eliminar este proyecto?')) return;
    this.proyectoService.eliminarProyecto(idProyecto).subscribe({
      next: () => this.cargarProyectos(),
      error: () => alert('Error al eliminar el proyecto')
    });
  }
}