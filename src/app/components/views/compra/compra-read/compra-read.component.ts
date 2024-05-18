import { CommonModule, registerLocaleData } from '@angular/common';
import { Component, LOCALE_ID, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';

import localePt from '@angular/common/locales/pt';
import localePtExtra from '@angular/common/locales/extra/pt';
import { CompraService } from '../../../../services/compra/compra.service';
import { MatSort } from '@angular/material/sort';
import { Compra } from './compra.model';
import { ItemCompra } from './itemsCompra.model';
// import { Fornecedor } from "../../fornecedor/fornecedor-read/fornecedor.model";
// import { Usuario } from "../../usuario/usuario-read/usuario.model";
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Usuario } from './usuario.model';
import { Fornecedor } from './fornecedor.model';

// export interface Supplier {
//   id?: number;
//   name: string;
//   email: string;
//   telephone: string;
//   description: string;
// }

// export interface User {
//   id?: number;
//   name: string;
//   email: string;
//   telephone: string;
//   password: string;
// }


// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   cost: number;
//   expirationDate: string;
//   amount: number;
//   typeProduct: string;
// }

// interface ItemPurchase {
//   id: number;
//   product: Product;
//   amount: number;
//   discount: number;
//   finalPrice: number;
// }

// interface Purchase {
//   id: number;
//   saleDate: number;
//   total: number;
//   subTotal: number | null;
//   user: User;
//   supplier: Supplier;
//   itemsPurchase: ItemPurchase[];
// }

export interface PeriodicElement {
  id?: number;
  purchaseDate: Date;
  total: number;
  subTotal: number;
  user: Usuario;
  supplier: Fornecedor;
  itemsPurchases: ItemCompra[];
}

registerLocaleData(localePt, 'pt-BR', localePtExtra);

@Component({
  selector: 'app-compra-read',
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
  templateUrl: './compra-read.component.html',
  styleUrl: './compra-read.component.scss'
})
export class CompraReadComponent {
  panelOpenState = false;

  displayedColumns: string[] = ['id', 'purchaseDate', 'total', 'supplierName', 'username','action'];

  displayedColumnsItems: string[] = ['productName', 'amount', 'priceProduct' ,'discount', 'finalPrice'];

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  expandedElement: PeriodicElement | null | undefined;
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];

  purchases: any[] = [];

  compras: Compra[] = []

  itemsCompra: ItemCompra[] = []

  usuario: Usuario = {
    name: '',
    email: '',
    telephone: '',
    password: ''
  }

  fornecedor: Fornecedor = {
    name: '',
    email: '',
    telephone: '',
    description: '',
    address: ''
  }

  compra: Compra = {
    purchaseDate: new Date(),
    total: 0,
    subTotal: 0,
    user: this.usuario,
    supplier: this.fornecedor,
    itemsPurchases: this.itemsCompra
  }


  periodic: PeriodicElement[] = [];

  dataSource = new MatTableDataSource(this.compras);

  constructor(private service: CompraService, private router: Router){
    this.findAll();
    this.dataSource.paginator = this.paginator;
    //this.itemsVenda =  this.vendas.map(m => m.itemsSale)
  }
  

  findAll() {
    this.service.findAll().subscribe(
      (response) => {
        this.purchases = response;
        this.periodic = this.purchases;
        this.dataSource = new MatTableDataSource(this.periodic);

        console.log(this.purchases)
        console.log(this.dataSource)
      },
      (err) => {
        this.service.mensagem('Erro ao buscar lista de compras');
      }
    );
  }

  toggleRow(row: any) {
    row.expanded = !row.expanded;
  }

  criarCompraComponent() {
    this.router.navigate(['compras/create']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
