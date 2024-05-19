import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ProdutoService } from '../../../../services/produto/produto.service';
import { Produto } from '../produto-read/produto.model';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-produto-update',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSelectModule
  ],
  providers: [ProdutoService],
  templateUrl: './produto-update.component.html',
  styleUrl: './produto-update.component.scss',
})
export class ProdutoUpdateComponent {

  tipos: any[] = [
    {value: 'PRODUTO_PARA_VENDA', viewValue: 'Produto para venda'},
    {value: 'MATERIA_PRIMA', viewValue: 'insumo de trabalho'}
  ];

  produto: Produto = {
    name: '',
    description: '',
    price: 0,
    cost: 0,
    expirationDate: new Date(),
    amount: 0,
    typeProduct: '',
  };

  constructor(
    private service: ProdutoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.produto.id = Number(this.route.snapshot.paramMap.get('id'));
    this.findById();
  }

  findById(): void {
    this.service.findById(this.produto.id!).subscribe(
      (resposta) => {
        this.produto = resposta;
      },
      (err) => {
        this.service.mensagem('Nenhum produto encontrado');
      }
    );
  }

  update(): void {
    this.service.update(this.produto, this.produto.id!).subscribe(
      (resposta) => {
        this.router.navigate(['produtos']);
        this.service.mensagem('Dados alterados com sucesso');
      },
      (err) => {
        this.service.mensagem('Erro ao atulizar produto');
      }
    );
  }

  cancel(): void {
    this.router.navigate(['produtos']);
  }
}
