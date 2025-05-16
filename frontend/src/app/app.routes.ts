import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CrearProyectosComponent } from './components/crear-proyectos/crear-proyectos.component';
import { DetallarProyectoComponent } from './components/detallar-proyecto/detallar-proyecto.component';





export const routes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'crear-proyectos', component: CrearProyectosComponent },
    {path: 'detallar-proyecto', component: DetallarProyectoComponent}
];
