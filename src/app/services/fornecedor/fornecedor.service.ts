import { Injectable } from '@angular/core';
import { Fornecedor } from '../../components/views/fornecedor/fornecedor-read/fornecedor.model';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { enviroment } from '../../../environments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class FornecedorService {
  baseUtl: string = enviroment.baseUrl;

  constructor(private http: HttpClient, private snack: MatSnackBar) {}

  findAll(): Observable<Fornecedor[]> {
    const url = `${this.baseUtl}/supplier`;
    return this.http.get<Fornecedor[]>(url);
  }

  create(fornecedor: Fornecedor): Observable<Fornecedor> {
    const url = `${this.baseUtl}/supplier`;
    return this.http.post<Fornecedor>(url, fornecedor);
  }

  findById(id: number): Observable<Fornecedor> {
    const url = `${this.baseUtl}/supplier/${id}`;
    return this.http.get<Fornecedor>(url);
  }

  update(id: number, fornecedor: Fornecedor): Observable<Fornecedor> {
    const url = `${this.baseUtl}/supplier/${id}`;
    return this.http.put<Fornecedor>(url, fornecedor);
  }

  delete(id: number): Observable<void> {
    const url = `${this.baseUtl}/supplier/${id}`;
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
