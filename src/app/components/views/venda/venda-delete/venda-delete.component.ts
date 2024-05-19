import { Component, LOCALE_ID } from '@angular/core';
import { Cliente } from '../../cliente/cliente-read/cliente.model';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ClienteService } from '../../../../services/cliente/cliente.service';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../../../../services/produto/produto.service';
import { Produto } from '../../produto/produto-read/produto.model';
import { VendaService } from '../../../../services/venda/venda.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, registerLocaleData } from '@angular/common';

import localePt from '@angular/common/locales/pt';
import localePtExtra from '@angular/common/locales/extra/pt';

import { MatCardModule } from '@angular/material/card';
import { ClienteModel, ProdutoModel } from '../venda-create/venda-create.component';
import { ItemVenda } from '../venda-create/itemsVenda.model';
import { AddItem } from '../venda-create/addItem.model';
import { VendaCreate } from '../venda-create/vendaCreate.model';
import { AddCustomer } from '../venda-create/AddCustomer';
import { AddProduct } from '../venda-create/addProduct';
import { Venda } from '../venda-read/venda.model';
import { ItemCompra } from '../../compra/compra-read/itemsCompra.model';

registerLocaleData(localePt, 'pt-BR', localePtExtra);

@Component({
  selector: 'app-venda-delete',
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
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  templateUrl: './venda-delete.component.html',
  styleUrl: './venda-delete.component.scss'
})

export class VendaDeleteComponent {
  ordemColunasTabela = ['product', 'amount', 'discount'];

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
    name: '',
  };

  produtoModel: ProdutoModel = {
    id: 0,
    name: '',
  };

  itemVenda: ItemVenda = {
    product: this.produtoModel,
    amount: 0,
    discount: 0,
    finalPrice: 0,
  };

  itemsVenda: ItemVenda[] = [];

  items: AddItem[] = [];

  itemsVenda1: ItemCompra[] = [];

  dataSource = new MatTableDataSource(this.items);

  venda: Venda = {
    customer: this.cliente,
    itemsSale: this.itemsVenda1,
    saleDate: new Date(),
    total: 0,
    subTotal: 0
  };

  clientes: Cliente[] = [];

  produtos: Produto[] = [];

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private productService: ProdutoService,
    private service: VendaService,
    private route: ActivatedRoute
  ) {
    this.venda.id = Number(this.route.snapshot.paramMap.get('id'));
    this.findById();

    
    // this.findAllCustomers();
    // this.findAllProducts();
    
  }

  // findAllCustomers() {
  //   this.clienteService.findAll().subscribe(
  //     (response) => {
  //       this.clientes = response;
  //     },
  //     (err) => {
  //       this.clienteService.mensagem('Erro ao buscar lista de clientes');
  //     }
  //   );
  // }

  // findAllProducts() {
  //   this.productService.findAllByTypeProductForSale().subscribe((produtos) => {
  //     this.produtos = produtos;
  //   });
  // }

  // adicionarItem() {
  //   const customer = new AddCustomer(this.clienteVenda.id!);

  //   const product = new AddProduct(
  //     this.produtoModel.id!,
  //     this.produtoModel.name!
  //   );

  //   const item = new AddItem(
  //     product,
  //     this.itemVenda.amount,
  //     this.itemVenda.discount
  //   );

  //   this.venda.customer = customer;
  //   this.venda.itemsSale.push(item);
  //   this.dataSource.data = [...this.items];
  // }

  // removeItem(id: number) {
  //   this.items = this.items.filter((item) => item.product.id !== id);
  //   this.venda.itemsSale = this.items;
  //   this.dataSource.data = [...this.items];
  // }

  // removeItem(itemVenda: ItemVenda){
  //   console.log(this.items)
  //   this.items.filter(item => item.product.id !== itemVenda.product.id);
  //   console.log(this.items)
  //   this.venda.itemsSale = [...this.items]
  //   this.dataSource.data = [...this.items];
  // }

  delete(): void {
    this.service.delete(this.venda.id!).subscribe(
      (response) => {
        this.router.navigate(['vendas']);
        this.service.mensagem('Venda excluida com sucesso!');
      },
      (err) => {
        this.service.mensagem('Erro ao deletar venda!');
      }
    );
  }


  findById(): void {
    this.service.findById(this.venda.id!).subscribe(
      (response) => {
        this.venda = response;
        console.log(this.venda)
      },
      (err) => {
        this.service.mensagem('venda nao encontrada');
      }
    );
  }

  cancel() {
    this.router.navigate(['vendas']);
  }
}
