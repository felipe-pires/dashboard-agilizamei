import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ProdutoService } from '../../../../services/produto/produto.service';
import { Produto } from '../produto-read/produto.model';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-produto-create',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSelectModule
  ],
  providers: [
    ProdutoService
  ],
  templateUrl: './produto-create.component.html',
  styleUrl: './produto-create.component.scss'
})
export class ProdutoCreateComponent {

  tipos: any[] = [
    {value: 'PRODUTO_PARA_VENDA', viewValue: 'Produto para venda'},
    {value: 'MATERIA_PRIMA', viewValue: 'insumo de trabalho'}
  ];

  produto: Produto = {
    name: '',
    description: '',
    price: 0,
    cost: 0,
    expirationDate: new Date('0000-00-00T00:00:00.000'),
    amount: 0,
    typeProduct: ''
  }

  constructor(private service: ProdutoService, private router: Router) {

  }

  create(): void{
    this.service.create(this.produto).subscribe((resposta) => {
      this.router.navigate(['produtos']);
      this.service.mensagem('Produto criado com sucesso!')
    }, err => {
        this.service.mensagem("Erro ao salvar")
    })
  }

  cancel(): void{
    this.router.navigate(['produtos']);
  }

}
