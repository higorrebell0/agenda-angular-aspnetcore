import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from 'src/app/models/paciente.model';
import { PacienteService } from 'src/app/services/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbCalendar, NgbDateStruct, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { Consulta } from 'src/app/models/consulta.model';
import { ConsultaService } from 'src/app/services/consulta.service';

@Component({
  selector: 'app-form-consulta',
  templateUrl: './form-consulta.component.html',
  styleUrls: ['./form-consulta.component.css']
})
export class FormConsultaComponent implements OnInit {
  @ViewChild('dInicio') dataInicio: NgbDatepicker;
  @ViewChild('dTermino') dataTermino: NgbDatepicker;
  date: { year: number, month: number };
  dtInicio: NgbDateStruct;
  dtTermino: NgbDateStruct;

  public form: FormGroup;
  actionType: string;
  formDtInicio: string;
  formDtTermino: string;
  formPaciente: string;
  formObservacoes: string;
  consultaID: number;
  errorMessage: any;
  consultaExistente: Consulta;

  constructor(
    private pacienteService: PacienteService,
    private consultaService: ConsultaService,
    private formBuilder: FormBuilder,
    private avRoute: ActivatedRoute,
    private router: Router,
    private calendar: NgbCalendar
  ) {
    const idParam = 'id';
    this.actionType = 'Cadastrar';
    this.formDtInicio = 'dtInicio';
    this.formDtTermino = 'dtTermino';
    this.formObservacoes = 'observacoes';
    this.formPaciente = 'paciente';

    if (this.avRoute.snapshot.params[idParam]) {
      this.consultaID = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group({
      consultaID: 0,
      dataInicio: ['', [Validators.required]],
      dataTermino: ['', [Validators.required]],
      observacoes: [''],
      paciente: { }
    });
  }

  ngOnInit(): void {
    if (this.consultaID > 0) {
      this.actionType = 'Editar';
      this.consultaService.getConsulta(this.consultaID)
        .subscribe(data => {
          this.consultaExistente = data,
          //tratar datas
          this.form.controls[this.formDtInicio].setValue(data.dataInicio),
          this.form.controls[this.formDtTermino].setValue(data.dataTermino),
          this.form.controls[this.formObservacoes].setValue(data.observacoes),
          this.form.controls[this.formPaciente].setValue(data.paciente)
        });
    }
  }

  validateDate() {
    console.log("IN");
  }

  salvar() {
    if (!this.form.valid) {
      return;
    }

    // if (this.actionType === 'Cadastrar') {
    //   let dtInicioObj = this.form.get(this.formDtInicio).value;
    //   let dtTerminoObj = this.form.get(this.formDtTermino).value;

    //   let consulta: Consulta = {
    //     dataInicio: new Date(dateObject.year, dateObject.month, dateObject.day),
    //     dataNascimento: new Date(dateObject.year, dateObject.month, dateObject.day),
    //     email: this.form.get(this.formEmail).value,
    //     telefone: this.form.get(this.formTelefone).value
    //   };

    //   this.pacienteService.createPaciente(paciente)
    //     .subscribe(data => {
    //       console.log(data);
    //       this.router.navigate(['/pacientes']);
    //     });
    // }
  }

}
