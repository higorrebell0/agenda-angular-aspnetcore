import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Consulta } from 'src/app/models/consulta.model';
import { ConsultaService } from 'src/app/services/consulta.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {
  listaConsultas$: Observable<Array<Consulta>>;

  constructor(private consultaService: ConsultaService) { }

  ngOnInit(): void {
    this.loadConsultas();
  }

  loadConsultas() {
    this.listaConsultas$ = this.consultaService.getConsultas();
  }

  delete(id) {
    const ans = confirm('Deseja exluir a consulta de id: ' + id);
    if (ans) {
      this.consultaService.deleteConsulta(id).subscribe(data => {
        this.loadConsultas()
      });
    }
  }

}
