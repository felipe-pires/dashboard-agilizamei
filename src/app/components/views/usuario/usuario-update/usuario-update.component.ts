import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Usuario } from '../usuario-read/usuario.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../../services/usuario/usuario.service';

@Component({
  selector: 'app-usuario-update',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './usuario-update.component.html',
  styleUrl: './usuario-update.component.scss'
})
export class UsuarioUpdateComponent {

  usuario: Usuario = {
    id: 0,
    name: '',
    email: '',
    telephone: '',
    password: ''
  }

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

  update() {
    this.service.update(this.usuario.id!, this.usuario).subscribe(
      (response) => {
        this.router.navigate(['usuarios']);
        this.service.mensagem('usuario atualizado com sucesso!');
      },
      (err) => {
        this.service.mensagem('Erro ao atualizar usuario!');
      }
    );
  }

  cancel() {
    this.router.navigate(['usuarios']);
  }

}
