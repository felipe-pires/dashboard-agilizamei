import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../../environments/enviroments';
import { LoginResponse } from '../../types/login-response.type';
import { Observable, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl: string = enviroment.baseUrl;

  mostrarMenu = new EventEmitter<boolean>();

  constructor(
    private http: HttpClient,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  login(email: string, password: string) {
    const url = `${this.baseUrl}/auth/login`;
    return this.http.post<LoginResponse>(url, { email, password }).pipe(
      tap(
        (value) => {
          sessionStorage.setItem('auth-token', value.token);
          localStorage.setItem('auth-token', value.token);
          sessionStorage.setItem('username', value.name);

          this.mostrarMenu.emit(true);
          this.router.navigate(['home']);
        },
        (err) => {
          this.mostrarMenu.emit(false);
        }
      )
    );
  }

  logout(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.mensagem('Sessão encerrada');
    this.router.navigate(['/login']);
  }

  isUserLoggedIn() {
    return this.mostrarMenu;
  }

  isLogin() {
    if (this.router.url == '/login') {
      return false;
    } else {
      return true;
    }
  }

  mensagem(str: string): void {
    this.snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
    });
  }
}
