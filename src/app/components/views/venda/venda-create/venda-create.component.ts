import { Component } from '@angular/core';
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

export interface ClienteModel {
  id?: number;
}

export interface ProdutoModel {
  id?: number;
}

// interface ItemSale {
//   id: number;
//   product: Product;
//   amount: number;
//   discount: number;
//   finalPrice: number;
// }

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
  ],

  templateUrl: './venda-create.component.html',
  styleUrl: './venda-create.component.scss',
})
export class VendaCreateComponent {
  selectedValue: string | undefined;

  selectedValueProduct: string | undefined;

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
  };

  produtoModel: ProdutoModel = {
    id: 0,
  };

  itemVenda: ItemVenda = {
    product: this.produtoModel,
    amount: 0,
    discount: 0,
    finalPrice: 0,
  };

  itemsVenda: ItemVenda[] = [];

  venda: VendaCreate = {
    customer: this.clienteVenda,
    itemsSale: this.itemsVenda,
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

  create(): void {
    this.itemVenda.product = this.produtoModel;
    this.venda.customer = this.clienteVenda;
    this.venda.itemsSale.push(...this.venda.itemsSale, this.itemVenda);

    console.log(this.venda);

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
