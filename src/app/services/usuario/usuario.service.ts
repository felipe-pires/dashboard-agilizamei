import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from '../../components/views/usuario/usuario-read/usuario.model';
import { enviroment } from '../../../environments/enviroments';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  baseUrl: string = enviroment.baseUrl;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private snack: MatSnackBar
  ) {}

  findAll(): Observable<Usuario[]> {
    const url = `${this.baseUrl}/user`;
    return this.http.get<Usuario[]>(url);
  }

  create(usuario: Usuario): Observable<Usuario> {
    const url = `${this.baseUrl}/auth/register`;
    return this.http.post<Usuario>(url, usuario);
  }

  findById(id: number): Observable<Usuario> {
    const url = `${this.baseUrl}/user/${id}`;
    return this.http.get<Usuario>(url);
  }

  update(id: number, usuario: Usuario): Observable<Usuario> {
    const url = `${this.baseUrl}/auth/update/${id}`;
    return this.http.put<Usuario>(url, usuario);
  }

  delete(id: number): Observable<void> {
    const url = `${this.baseUrl}/user/${id}`;
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
