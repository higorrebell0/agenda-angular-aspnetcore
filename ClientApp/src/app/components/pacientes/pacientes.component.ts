import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from 'src/app/models/paciente.model';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {
  listPacientes$: Observable<Array<Paciente>>;

  constructor(private pacienteService: PacienteService) { }

  ngOnInit(): void {
    this.loadPacientes();
  }

  loadPacientes() {
    this.listPacientes$ = this.pacienteService.getPacientes();
    console.log(this.listPacientes$);
  }

  delete(id) {
    const ans = confirm('Deseja exluir o paciente de id: ' + id);
    if (ans) {
      this.pacienteService.deletePaciente(id).subscribe(data => {
        this.loadPacientes()
      });
    }
  }
}
