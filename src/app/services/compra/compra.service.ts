import { Injectable } from '@angular/core';
import { CompraCreate } from '../../components/views/compra/compra-create/compra-create.model';
import { Compra } from '../../components/views/compra/compra-read/compra.model';
import { Observable } from 'rxjs';
import { enviroment } from '../../../environments/enviroments';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  baseUrl: string = enviroment.baseUrl

  constructor(private http: HttpClient, private snack: MatSnackBar) { }

  findAll(): Observable<Compra[]>{
    const url = `${this.baseUrl}/purchase`;
    return this.http.get<Compra[]>(url);
  }

  create(compra: any): Observable<CompraCreate> {
    const url = `${this.baseUrl}/purchase`;
    return this.http.post<CompraCreate>(url, compra);
  }

  findById(id: number): Observable<Compra> {
    const url = `${this.baseUrl}/purchase/${id}`;
    return this.http.get<Compra>(url);
  }

  update(id: number, compra: Compra): Observable<Compra> {
    const url = `${this.baseUrl}/purchase/${id}`;
    return this.http.put<Compra>(url, compra);
  }

  delete(id: number): Observable<void> {
    const url = `${this.baseUrl}/purchase/${id}`;
    return this.http.delete<void>(url);
  }

  mensagem(str: string): void {
    this.snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
    });
  }
}
