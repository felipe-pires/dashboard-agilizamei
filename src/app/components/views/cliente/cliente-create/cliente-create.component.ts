import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Cliente } from '../cliente-read/cliente.model';
import { ClienteService } from '../../../../services/cliente/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-create',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './cliente-create.component.html',
  styleUrl: './cliente-create.component.scss',
})
export class ClienteCreateComponent {
  cliente: Cliente = {
    name: '',
    email: '',
    telephone: '',
    address: '',
  };

  constructor(private service: ClienteService, private router: Router) {}

  create(): void {
    this.service.create(this.cliente).subscribe(
      (reponse) => {
        this.router.navigate(['clientes']);
        this.service.mensagem('Cliente criado com sucesso!');
      },
      (err) => {
        this.service.mensagem('Erro ao salvar cliente');
      }
    );
  }

  cancel(){
    this.router.navigate(['clientes'])
  }
}
