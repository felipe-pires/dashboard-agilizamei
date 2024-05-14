import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DefaultLoginLayoutComponent } from '../../template/default-login-layout/default-login-layout.component';
import { PrimaryInputComponent } from '../../template/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    PrimaryInputComponent,
    ReactiveFormsModule,
  ],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private router: Router, private service: LoginService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  submit() {
    alert('sss')
    this.service
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: () => this.service.mensagem('Login feito com sucesso!'),
        error: () =>
          this.service.mensagem(
            'Falha ao logar! Tente Novamente em alguns instantes!'
          ),
      });
  }
}
