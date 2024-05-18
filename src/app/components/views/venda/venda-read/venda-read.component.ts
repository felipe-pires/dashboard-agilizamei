import { Component, ViewChild, LOCALE_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { Venda } from './venda.model';
import { Cliente } from './cliente.model';
import { VendaService } from '../../../../services/venda/venda.service';
import { ItemVenda } from './itemsVenda.model';
import { MatListModule } from '@angular/material/list';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule, registerLocaleData } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';

import localePt from '@angular/common/locales/pt';
import localePtExtra from '@angular/common/locales/extra/pt';

interface Customer {
  id: number;
  name: string;
  email: string;
  address: string;
  telephone: string;
  amountPurchase: number;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  cost: number;
  expirationDate: string;
  amount: number;
  typeProduct: string;
}

interface ItemSale {
  id: number;
  product: Product;
  amount: number;
  discount: number;
  finalPrice: number;
}

interface Sale {
  id: number;
  saleDate: number;
  total: number;
  subTotal: number | null;
  customer: Customer;
  itemsSale: ItemSale[];
}

export interface PeriodicElement {
  id?: number;
  saleDate: Date;
  total: number;
  subTotal: number;
  customer: Cliente;
  itemsSale: ItemVenda[];
}

registerLocaleData(localePt, 'pt-BR', localePtExtra);

@Component({
  selector: 'app-venda-read',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatListModule,
    MatPaginatorModule,
    CommonModule,
    MatExpansionModule,
    MatIconModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  templateUrl: './venda-read.component.html',
  styleUrl: './venda-read.component.scss'
})
export class VendaReadComponent {

  panelOpenState = false;

  displayedColumns: string[] = ['id', 'saleDate', 'total', 'customerName', 'customerTel','action'];

  displayedColumnsItems: string[] = ['productName', 'amount', 'priceProduct' ,'discount', 'finalPrice'];

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  expandedElement: PeriodicElement | null | undefined;
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];

  sales: any[] = [];

  vendas: Venda[] = []

  itemsVenda: ItemVenda[] = []



  cliente: Cliente = {
    name: '',
    email: '',
    telephone: '',
    address: ''
  }

  venda: Venda = {
    saleDate: new Date(),
    total: 0,
    subTotal: 0,
    customer: this.cliente,
    itemsSale: this.itemsVenda
  }

  periodic: PeriodicElement[] = [];

  dataSource = new MatTableDataSource(this.vendas);

  constructor(private service: VendaService, private router: Router){
    this.findAll();
    this.dataSource.paginator = this.paginator;
    //this.itemsVenda =  this.vendas.map(m => m.itemsSale)
  }
  

  findAll() {
    this.service.findAll().subscribe(
      (response) => {
        this.sales = response;
        this.periodic = this.sales;
        this.dataSource = new MatTableDataSource(this.periodic);
      },
      (err) => {
        this.service.mensagem('Erro ao buscar lista de vendas');
      }
    );
  }

  toggleRow(row: any) {
    row.expanded = !row.expanded;
  }

  criarVendaComponent() {
    this.router.navigate(['vendas/create']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
