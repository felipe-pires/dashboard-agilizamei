import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../environments/enviroments';
import { Observable } from 'rxjs';
import { Cliente } from '../../components/views/cliente/cliente-read/cliente.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  baseUtl: string = enviroment.baseUrl;

  constructor(private http: HttpClient, private snack: MatSnackBar) {}

  findAll(): Observable<Cliente[]> {
    const url = `${this.baseUtl}/customer`;
    return this.http.get<Cliente[]>(url);
  }

  create(cliente: Cliente): Observable<Cliente> {
    const url = `${this.baseUtl}/customer`;
    return this.http.post<Cliente>(url, cliente);
  }

  findById(id: number): Observable<Cliente> {
    const url = `${this.baseUtl}/customer/${id}`;
    return this.http.get<Cliente>(url);
  }

  update(id: number, cliente: Cliente): Observable<Cliente> {
    const url = `${this.baseUtl}/customer/${id}`;
    return this.http.put<Cliente>(url, cliente);
  }

  delete(id: number): Observable<void> {
    const url = `${this.baseUtl}/customer/${id}`;
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
