import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ProdutoService } from '../../../../services/produto/produto.service';
import { Produto } from './produto.model';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-produto-read',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink],
  providers: [ProdutoService],
  templateUrl: './produto-read.component.html',
  styleUrl: './produto-read.component.scss',
})
export class ProdutoReadComponent {
  produtos: Produto[] = [];

  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'price',
    'cost',
    'expirationDate',
    'amount',
    'typeProduct',
    'action',
  ];

  constructor(private service: ProdutoService, private router: Router) {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe((produtos) => (this.produtos = produtos));
  }

  criarProdutoComponent() {
    this.router.navigate(['produtos/create']);
  }
}
