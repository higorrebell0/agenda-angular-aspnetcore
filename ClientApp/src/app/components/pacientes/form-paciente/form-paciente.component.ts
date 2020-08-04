import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from 'src/app/models/paciente.model';
import { PacienteService } from 'src/app/services/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbCalendar, NgbDateStruct, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form-paciente',
  templateUrl: './form-paciente.component.html',
  styleUrls: ['./form-paciente.component.css']
})
export class FormPacienteComponent implements OnInit {
  title = 'angular-bootstrap-datepicker-tutorial';

  model: NgbDateStruct;
  date: { year: number, month: number };
  @ViewChild('dp') dp: NgbDatepicker;

  public form: FormGroup;
  actionType: string;
  formNome: string;
  formDtNascimento: string;
  formEmail: string;
  formTelefone: string;
  pacienteID: number;
  errorMessage: any;
  pacienteExistente: Paciente;

  constructor(
    private pacienteService: PacienteService,
    private formBuilder: FormBuilder,
    private avRoute: ActivatedRoute,
    private router: Router,
    private calendar: NgbCalendar) {
      const idParam = 'id';
      this.actionType = 'Cadastrar';
      this.formNome = 'nome';
      this.formDtNascimento = 'dataNascimento';
      this.formEmail = 'email';
      this.formTelefone = 'telefone';

      if (this.avRoute.snapshot.params[idParam]) {
        this.pacienteID = this.avRoute.snapshot.params[idParam];
      }

      this.form = this.formBuilder.group({
        pacienteID: 0,
        nome: ['', [Validators.required]],
        dataNascimento: ['', [Validators.required]],
        email: [''],
        telefone: ['']
      });
    }


  ngOnInit(): void {
    if (this.pacienteID > 0) {
      this.actionType = 'Editar';
      this.pacienteService.getPaciente(this.pacienteID)
        .subscribe(data => {
          let dataNasc = new Date(data.dataNascimento);
          this.pacienteExistente = data,
          this.form.controls[this.formNome].setValue(data.nome),
          this.model = { year: dataNasc.getFullYear(), month: dataNasc.getMonth(), day: dataNasc.getDate() };
          //this.form.controls[this.formDtNascimento].setValue(dtObj.year + '-' + dtObj.month + '-' + dtObj.day),
          this.form.controls[this.formEmail].setValue(data.email),
          this.form.controls[this.formTelefone].setValue(data.telefone)
        });
    }
  }

  salvar() {
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === 'Cadastrar') {
      let dateObject = this.form.get(this.formDtNascimento).value;

      let paciente: Paciente = {
        nome: this.form.get(this.formNome).value,
        dataNascimento: new Date(dateObject.year, dateObject.month, dateObject.day),
        email: this.form.get(this.formEmail).value,
        telefone: this.form.get(this.formTelefone).value
      };

      this.pacienteService.createPaciente(paciente)
        .subscribe(data => {
          console.log(data);
          this.router.navigate(['/pacientes']);
        });
    }

    if (this.actionType === 'Editar') {
      let dateObject = this.form.get(this.formDtNascimento).value;

      let paciente: Paciente = {
        pacienteID: this.pacienteExistente.pacienteID,
        nome: this.form.get(this.formNome).value,
        dataNascimento: new Date(dateObject.year, dateObject.month, dateObject.day),
        email: this.form.get(this.formEmail).value,
        telefone: this.form.get(this.formTelefone).value
      };
      this.pacienteService.updatePaciente(paciente.pacienteID, paciente)
        .subscribe(data => {
          this.router.navigate(['/pacientes']);
        });
    }
  }

  cancelar() {
    this.router.navigate(['/pacientes']);
  }

  get nome() { return this.form.get(this.formNome); }
  get dataNascimento() { return this.form.get(this.formDtNascimento); }
  get email() { return this.form.get(this.formEmail); }
  get telefone() { return this.form.get(this.formTelefone); }
}
