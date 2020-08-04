import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PacientesComponent } from './components/pacientes/pacientes.component';
import { FormPacienteComponent } from './components/pacientes/form-paciente/form-paciente.component';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { FormConsultaComponent } from './components/consultas/form-consulta/form-consulta.component';

import { PacienteService } from './services/paciente.service';
import { ConsultaService } from './services/consulta.service';

@NgModule({
  declarations: [
    AppComponent,
    PacientesComponent,
    FormPacienteComponent,
    ConsultasComponent,
    FormConsultaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    NgxMatTimepickerModule,
    MatButtonModule,
    NgxMatDatetimePickerModule,
    NgxMatMomentModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    NgbModule
  ],
  providers: [
    PacienteService,
    ConsultaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
