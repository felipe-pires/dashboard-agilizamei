import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProdutoService } from '../../../../services/produto/produto.service';
import { ActivatedRoute } from '@angular/router';
import { Produto } from '../produto-read/produto.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produto-delete',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  providers: [ProdutoService],
  templateUrl: './produto-delete.component.html',
  styleUrl: './produto-delete.component.scss',
})
export class ProdutoDeleteComponent {
  produto: Produto = {
    id: 0,
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
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.produto.id = Number(this.route.snapshot.paramMap.get('id'));
    this.findById();
  }

  findById(): void {
    this.service.findById(this.produto.id!).subscribe(
      (resposta) => {
        this.produto = resposta;
        this.produto.expirationDate = new Date('2022-09-12T00:00:00');
        
      },
      (err) => {
        this.service.mensagem('Produto nao encontrado');
      }
    );
  }

  cancel(): void {
    this.router.navigate(['produtos']);
  }

  delete(): void {
    this.service.delete(this.produto.id!).subscribe(
      (resposta) => {
        this.router.navigate(['produtos'])
        this.service.mensagem('Produto deletado com sucesso!');
      },
      (err) => {
        this.service.mensagem('Erro ao deletar produto');
      }
    );
  }
}
