import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../../../services/cliente/cliente.service';
import { Cliente } from '../cliente-read/cliente.model';

@Component({
  selector: 'app-cliente-update',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './cliente-update.component.html',
  styleUrl: './cliente-update.component.scss'
})
export class ClienteUpdateComponent {
  cliente: Cliente = {
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

  update() {
    this.service.update(this.cliente.id!, this.cliente).subscribe((response) => {
      this.router.navigate(['clientes'])
      this.service.mensagem('Cliente atualizado com sucesso!')
    }, err => {
      this.service.mensagem('Erro ao atualizar cliente!')
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
