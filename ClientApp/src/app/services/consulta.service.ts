import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Consulta } from '../models/consulta.model';


@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  appUrl: string;
  apiUrl: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.appUrl = environment.appUrl;
    this.apiUrl = 'api/Consultas';
  }

  getConsultas(): Observable<Array<Consulta>> {
    return this.http.get<Array<Consulta>>(this.appUrl + this.apiUrl).pipe(retry(1), catchError(this.errorHandler));
  }

  getConsulta(id: number): Observable<Consulta> {
    return this.http.get<Consulta>(this.appUrl + this.apiUrl + id).pipe(retry(1), catchError(this.errorHandler));
  }

  createConsulta(consulta): Observable<Consulta> {
    return this.http.post<Consulta>(this.appUrl + this.apiUrl, JSON.stringify(consulta), this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandler));
  }

  updateConsulta(id: number, consulta): Observable<Consulta> {
    return this.http.put<Consulta>(this.appUrl + this.apiUrl + id, JSON.stringify(consulta), this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandler));
  }

  deleteConsulta(postId: number): Observable<Consulta> {
    return this.http.delete<Consulta>(this.appUrl + this.apiUrl + postId).pipe(retry(1), catchError(this.errorHandler));
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
