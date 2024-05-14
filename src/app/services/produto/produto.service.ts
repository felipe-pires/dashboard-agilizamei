import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../../components/views/produto/produto-read/produto.model';
import { enviroment } from '../../../environments/enviroments';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  baseUrl: string = enviroment.baseUrl;

   headers = new HttpHeaders({
    'Authorization': 'Bearer ' + sessionStorage.getItem('auth-token'),
  });

  constructor(
    private http: HttpClient,
    private snack: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  findAll(): Observable<Produto[]> {
    const url = `${this.baseUrl}/product`;
    return this.http.get<Produto[]>(url, {headers: this.headers});
  }

  findByName(name: string): Observable<Produto> {
    const url = `${this.baseUrl}/product/name?${name}`;
    return this.http.get<Produto>(url, {headers: this.headers});
  }

  findById(id: number): Observable<Produto> {
    const url = `${this.baseUrl}/product/${id}`;
    return this.http.get<Produto>(url, {headers: this.headers});
  }

  create(produto: Produto): Observable<Produto> {
    const url = `${this.baseUrl}/product`;
    return this.http.post<Produto>(url, produto, {headers: this.headers});
  }

  update(produto: Produto, id: number): Observable<Produto> {
    const url = `${this.baseUrl}/product/${id}`;
    return this.http.put<Produto>(url, produto, {headers: this.headers});
  }

  delete(id: number): Observable<void> {
    const url = `${this.baseUrl}/product/${id}`;
    return this.http.delete<void>(url, {headers: this.headers});
  }

  mensagem(str: string): void {
    this.snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
    });
  }
}
