import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Paciente } from '../models/paciente.model';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  appUrl: string;
  apiUrl: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.appUrl = environment.appUrl;
    console.log(this.appUrl);
    this.apiUrl = 'api/Pacientes/';
  }

  getPacientes(): Observable<Array<Paciente>> {
    return this.http.get<Array<Paciente>>(this.appUrl + this.apiUrl).pipe(retry(1), catchError(this.errorHandler));
  }

  getPaciente(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(this.appUrl + this.apiUrl + id).pipe(retry(1), catchError(this.errorHandler));
  }

  createPaciente(paciente: Paciente): Observable<Paciente> {
    console.log(paciente);
    return this.http.post<Paciente>(this.appUrl + this.apiUrl, JSON.stringify(paciente), this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandler));
  }

  updatePaciente(id: number, paciente): Observable<Paciente> {
    return this.http.put<Paciente>(this.appUrl + this.apiUrl + id, JSON.stringify(paciente), this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandler));
  }

  deletePaciente(id: number): Observable<Paciente> {
    return this.http.delete<Paciente>(this.appUrl + this.apiUrl + id).pipe(retry(1), catchError(this.errorHandler));
  }

  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      //client-side error
      errorMessage = error.error.message;
    } else {
      //server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
