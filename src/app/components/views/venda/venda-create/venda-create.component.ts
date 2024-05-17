import { Component, LOCALE_ID } from '@angular/core';
import { Cliente } from '../../cliente/cliente-read/cliente.model';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ClienteService } from '../../../../services/cliente/cliente.service';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { ProdutoService } from '../../../../services/produto/produto.service';
import { Produto } from '../../produto/produto-read/produto.model';
import { VendaService } from '../../../../services/venda/venda.service';
import { ItemVenda } from './itemsVenda.model';
import { VendaCreate } from './vendaCreate.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, registerLocaleData } from '@angular/common';

import localePt from '@angular/common/locales/pt';
import localePtExtra from '@angular/common/locales/extra/pt';
import { AddItem } from './addItem.model';
import { AddProduct } from './addProduct';
import { MatCardModule } from '@angular/material/card';

export interface ClienteModel {
  id?: number;
  name?: string
}

export interface ProdutoModel {
  id?: number;
  name?: string
}

// interface ItemSale {
//   id: number;
//   product: Product;
//   amount: number;
//   discount: number;
//   finalPrice: number;
// }

registerLocaleData(localePt, 'pt-BR', localePtExtra);

@Component({
  selector: 'app-venda-create',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    CommonModule,
    MatCardModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  templateUrl: './venda-create.component.html',
  styleUrl: './venda-create.component.scss',
})
export class VendaCreateComponent {


  ordemColunasTabela = ['product', 'amount', 'discount', 'action'];

 

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

  cliente: Cliente = {
    id: 0,
    name: '',
    email: '',
    telephone: '',
    address: '',
  };

  clienteVenda: ClienteModel = {
    id: 0,
    name: ''
  };

  produtoModel: ProdutoModel = {
    id: 0,
    name: ''
  };

  itemVenda: ItemVenda = {
    product: this.produtoModel,
    amount: 0,
    discount: 0,
    finalPrice: 0,
  };

  itemsVenda: ItemVenda[] = [];

  items: AddItem[] = []

  dataSource = new MatTableDataSource(this.items);

  venda: VendaCreate = {
    customer: this.clienteVenda,
    itemsSale: this.items,
  };

  

  clientes: Cliente[] = [];

  produtos: Produto[] = [];

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private productService: ProdutoService,
    private service: VendaService
  ) {
    this.findAllCustomers();
    this.findAllProducts();
  }

  findAllCustomers() {
    this.clienteService.findAll().subscribe(
      (response) => {
        this.clientes = response;
      },
      (err) => {
        this.clienteService.mensagem('Erro ao buscar lista de clientes');
      }
    );
  }

  findAllProducts() {
    this.productService.findAll().subscribe((produtos) => {
      this.produtos = produtos;
    });
  }

  adicionarItem(){

    const product = new AddProduct(
      this.produtoModel.id!,
    )

    const item = new AddItem (
     product,
     this.itemVenda.amount,
     this.itemVenda.discount
     )

     this.venda.itemsSale.push(item)
     this.dataSource.data = [...this.items]; 
    

    // this.itemVenda.product = this.produtoModel;
    // this.venda.customer = this.clienteVenda;
    // this.venda.itemsSale.push(this.itemVenda);

  }

  // removeItem(itemVenda: ItemVenda){
  //   console.log(this.items)
  //   this.items.filter(item => item.product.id !== itemVenda.product.id);
  //   console.log(this.items)
  //   this.venda.itemsSale = [...this.items]
  //   this.dataSource.data = [...this.items];
  // }

  create(): void {

    this.service.create(this.venda).subscribe(
      (response) => {
        this.router.navigate(['vendas']);
        this.service.mensagem('Venda cadastrada com sucesso!');
      },
      (err) => {
        this.service.mensagem('Erro ao cadastrar venda!');
      }
    );
  }

  cancel() {
    this.router.navigate(['vendas']);
  }
}
