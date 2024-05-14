import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ClienteService } from '../../../../services/cliente/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../cliente-read/cliente.model';

@Component({
  selector: 'app-cliente-delete',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './cliente-delete.component.html',
  styleUrl: './cliente-delete.component.scss',
})
export class ClienteDeleteComponent {
  cliente: Cliente = {
    id: 0,
    name: '',
    email: '',
    telephone: '',
    address: '',
  };

  constructor(
    private service: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.cliente.id = Number(this.route.snapshot.paramMap.get('id'));
    this.findById();
  }

  delete() {
    this.service.delete(this.cliente.id!).subscribe((response) => {
      this.router.navigate(['clientes'])
      this.service.mensagem('Cliente deletado com sucesso!')
    }, err => {
      this.service.mensagem('Erro ao deletar cliente!')
    })
  }

  findById(): void {
    this.service.findById(this.cliente.id!).subscribe(
      (response) => {
        this.cliente = response;
      },
      (err) => {
        this.service.mensagem('cliente nao encontrado');
      }
    );
  }

  cancel() {
    this.router.navigate(['clientes']);
  }
}
