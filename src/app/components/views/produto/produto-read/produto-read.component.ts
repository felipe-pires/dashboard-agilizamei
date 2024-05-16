import { Component, LOCALE_ID} from '@angular/core';
import { ProdutoService } from '../../../../services/produto/produto.service';
import { Produto } from './produto.model';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

import localePt from '@angular/common/locales/pt';
import localePtExtra from '@angular/common/locales/extra/pt';
import { CommonModule, registerLocaleData } from '@angular/common';

registerLocaleData(localePt, 'pt-BR', localePtExtra);

export interface PeriodicElement {
  id?: number;
  name: string;
  description: string;
  price: number;
  cost: number;
  expirationDate: Date;
  amount: number;
  typeProduct: string;
}

@Component({
  selector: 'app-produto-read',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    CommonModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  templateUrl: './produto-read.component.html',
  styleUrl: './produto-read.component.scss',
})
export class ProdutoReadComponent {
  produtos: Produto[] = [];

  periodic: PeriodicElement[] = [];

  dataSource = new MatTableDataSource(this.produtos);

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
    this.service.findAll().subscribe((produtos) => {
      this.produtos = produtos;
      this.periodic = this.produtos;
      this.dataSource = new MatTableDataSource(this.periodic);
    });
  }

  criarProdutoComponent() {
    this.router.navigate(['produtos/create']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
