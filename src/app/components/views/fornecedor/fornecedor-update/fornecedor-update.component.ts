import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FornecedorService } from '../../../../services/fornecedor/fornecedor.service';
import { Fornecedor } from '../fornecedor-read/fornecedor.model';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-fornecedor-update',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './fornecedor-update.component.html',
  styleUrl: './fornecedor-update.component.scss'
})
export class FornecedorUpdateComponent {
  fornecedor: Fornecedor = {
    name: '',
    email: '',
    telephone: '',
    address: '',
    description: '',
  };

  constructor(private service: FornecedorService, private router: Router, private route: ActivatedRoute) {
    this.fornecedor.id = Number(this.route.snapshot.paramMap.get('id'));
    this.findById();
  }

  update(): void {
    this.service.update(this.fornecedor.id!, this.fornecedor).subscribe(
      (reponse) => {
        this.router.navigate(['fornecedores']);
        this.service.mensagem('Fornecedor criado com sucesso!');
      },
      (err) => {
        this.service.mensagem('Erro ao salvar fornecedor');
      }
    );
  }

  findById(): void {
    this.service.findById(this.fornecedor.id!).subscribe(
      (response) => {
        this.fornecedor = response;
        
      },
      (err) => {
        this.service.mensagem('fornecedor nao encontrado');
      }
    );
  }

  cancel() {
    this.router.navigate(['fornecedores']);
  }

}
