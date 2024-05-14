import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Usuario } from '../usuario-read/usuario.model';
import { UsuarioService } from '../../../../services/usuario/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-create',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './usuario-create.component.html',
  styleUrl: './usuario-create.component.scss',
})
export class UsuarioCreateComponent {
  usuario: Usuario = {
    name: '',
    email: '',
    telephone: '',
    password: '',
  };

  constructor(private service: UsuarioService, private router: Router) {}

  create() {
    this.service.create(this.usuario).subscribe(
      (response) => {
        this.router.navigate(['usuarios']);
        this.service.mensagem('usuario criado com sucesso!');
      },
      (err) => {
        this.service.mensagem('Erro ao criar usuario!');
      }
    );
  }

  cancel() {
    this.router.navigate(['usuarios']);
  }
}
