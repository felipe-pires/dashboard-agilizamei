import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Fornecedor } from '../fornecedor-read/fornecedor.model';
import { FornecedorService } from '../../../../services/fornecedor/fornecedor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fornecedor-create',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './fornecedor-create.component.html',
  styleUrl: './fornecedor-create.component.scss',
})
export class FornecedorCreateComponent {
  fornecedor: Fornecedor = {
    name: '',
    email: '',
    telephone: '',
    address: '',
    description: '',
  };

  constructor(private service: FornecedorService, private router: Router) {}

  create(): void {
    this.service.create(this.fornecedor).subscribe(
      (reponse) => {
        this.router.navigate(['fornecedores']);
        this.service.mensagem('Fornecedor criado com sucesso!');
      },
      (err) => {
        this.service.mensagem('Erro ao salvar fornecedor');
      }
    );
  }

  cancel() {
    this.router.navigate(['fornecedores']);
  }
}
