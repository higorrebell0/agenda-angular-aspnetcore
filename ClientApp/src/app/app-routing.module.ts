import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { FormConsultaComponent } from './components/consultas/form-consulta/form-consulta.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { FormPacienteComponent } from './components/pacientes/form-paciente/form-paciente.component';

const routes: Routes = [
  { path: '', component: ConsultasComponent, pathMatch: 'full' },
  { path: 'consulta/:id', component: FormConsultaComponent },
  { path: 'consulta/cadastrar', component: FormConsultaComponent },
  { path: 'consulta/editar/:id', component: FormConsultaComponent },

  { path: 'pacientes', component: PacientesComponent },
  { path: 'paciente/:id', component: FormPacienteComponent },
  { path: 'paciente/cadastrar', component: FormPacienteComponent },
  { path: 'paciente/editar/:id', component: FormPacienteComponent },

  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
