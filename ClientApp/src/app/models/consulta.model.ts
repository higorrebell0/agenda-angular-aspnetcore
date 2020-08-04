import { Paciente } from './paciente.model';

export class Consulta {
  consultaID: number;
  dataInicio: Date;
  dataTermino: Date;
  observacoes: string;
  pacienteID: number;

  paciente: Paciente;
}
