import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CrearProyectosComponent } from './components/crear-proyectos/crear-proyectos.component';
import { DetallarProyectoComponent } from './components/detallar-proyecto/detallar-proyecto.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { CrearTareaComponent } from './components/crear-tarea/crear-tarea.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'crear-proyectos', component: CrearProyectosComponent, canActivate: [authGuard] },
  { path: 'detallar-proyecto/:id', component: DetallarProyectoComponent, canActivate: [authGuard] },
  { path: 'crear-tarea/:proyectoId', component: CrearTareaComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'dashboard' }
];