import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../environments/enviroments';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Venda } from '../../components/views/venda/venda-read/venda.model';
import { VendaCreate } from '../../components/views/venda/venda-create/vendaCreate.model';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  baseUrl: string = enviroment.baseUrl

  constructor(private http: HttpClient, private snack: MatSnackBar) { }

  findAll(): Observable<Venda[]>{
    const url = `${this.baseUrl}/sale`;
    return this.http.get<Venda[]>(url);
  }

  create(venda: VendaCreate): Observable<VendaCreate> {
    const url = `${this.baseUrl}/sale`;
    return this.http.post<VendaCreate>(url, venda);
  }

  findById(id: number): Observable<Venda> {
    const url = `${this.baseUrl}/sale/${id}`;
    return this.http.get<Venda>(url);
  }

  update(id: number, venda: Venda): Observable<Venda> {
    const url = `${this.baseUrl}/sale/${id}`;
    return this.http.put<Venda>(url, venda);
  }

  delete(id: number): Observable<void> {
    const url = `${this.baseUrl}/sale/${id}`;
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
