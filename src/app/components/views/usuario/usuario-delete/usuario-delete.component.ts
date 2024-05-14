import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Usuario } from '../usuario-read/usuario.model';
import { UsuarioService } from '../../../../services/usuario/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuario-delete',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './usuario-delete.component.html',
  styleUrl: './usuario-delete.component.scss',
})
export class UsuarioDeleteComponent {
  usuario: Usuario = {
    id: 0,
    name: '',
    email: '',
    telephone: '',
    password: '',
  };

  constructor(
    private service: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.usuario.id = Number(this.route.snapshot.paramMap.get('id'));
    this.findById();
  }

  findById() {
    this.service.findById(this.usuario.id!).subscribe(
      (resposta) => {
        this.usuario = resposta;
      },
      (err) => {
        this.service.mensagem('Usuario nao encontrado');
      }
    );
  }

  delete() {
    this.service.delete(this.usuario.id!).subscribe(
      (resposta) => {
        this.router.navigate(['usuarios']);
        this.service.mensagem('Usuario deletado com sucesso!');
      },
      (err) => {
        this.service.mensagem('Erro ao deletar usuario');
      }
    );
  }

  cancel() {
    this.router.navigate(['usuarios']);
  }
}
