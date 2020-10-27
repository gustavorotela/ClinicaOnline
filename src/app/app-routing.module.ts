import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { ProfesionalComponent } from './componentes/profesional/profesional.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { AltaComponent } from './componentes/turnos/alta/alta.component';
import { ModificacionComponent } from './componentes/turnos/modificacion/modificacion.component';
import { TurnoComponent } from './componentes/turnos/turno/turno.component';

const routes: Routes = [
  {path: 'Registro', component: RegistroComponent},
  {path: '', component: LoginComponent},
  {path: 'Principal', component: PrincipalComponent},
  {path: 'Turnos', component: TurnoComponent},
  {path: 'TurnoAlta', component: AltaComponent},
  {path: 'TurnoModificar', component: ModificacionComponent},
  {path: 'Profesional', component:ProfesionalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
