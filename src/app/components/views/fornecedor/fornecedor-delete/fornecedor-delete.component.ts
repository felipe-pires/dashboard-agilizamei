import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Fornecedor } from '../fornecedor-read/fornecedor.model';
import { FornecedorService } from '../../../../services/fornecedor/fornecedor.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fornecedor-delete',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './fornecedor-delete.component.html',
  styleUrl: './fornecedor-delete.component.scss'
})
export class FornecedorDeleteComponent {

  fornecedor: Fornecedor = {
    id: 0,
    name: '',
    email: '',
    telephone: '',
    address: '',
    description: ''
  }

  constructor(
    private service: FornecedorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.fornecedor.id = Number(this.route.snapshot.paramMap.get('id'));
    this.findById();
  }

  delete() {
    this.service.delete(this.fornecedor.id!).subscribe((response) => {
      this.router.navigate(['fornecedores'])
      this.service.mensagem('fornecedor deletado com sucesso!')
    }, err => {
      this.service.mensagem('Erro ao deletar fornecedor!')
    })
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
