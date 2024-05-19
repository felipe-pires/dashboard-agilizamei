import { Component, LOCALE_ID } from '@angular/core';

import localePt from '@angular/common/locales/pt';
import localePtExtra from '@angular/common/locales/extra/pt';
import { registerLocaleData, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsuarioService } from '../../../../services/usuario/usuario.service';
import { FornecedorService } from '../../../../services/fornecedor/fornecedor.service';
import { Router } from '@angular/router';
import { ProdutoService } from '../../../../services/produto/produto.service';
import { CompraService } from '../../../../services/compra/compra.service';
import { Usuario } from '../compra-read/usuario.model';
import { Fornecedor } from '../compra-read/fornecedor.model';
import { Produto } from '../../produto/produto-read/produto.model';
import { ItemCompra } from './item-compra.model';
import { AddItem } from './addItem.model';
import { CompraCreate } from './compra-create';
import { AddUser } from './add-user.model';
import { AddProduct } from './addProduct';
import { AddSupplier } from './add-supplier.model';

export interface UsuarioModel {
  id?: number;
  name?: string;
}

export interface FornecedorModel {
  id?: number;
  name?: string;
}

export interface ProdutoModel {
  id?: number;
  name?: string;
}


registerLocaleData(localePt, 'pt-BR', localePtExtra);

@Component({
  selector: 'app-compra-create',
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
  templateUrl: './compra-create.component.html',
  styleUrl: './compra-create.component.scss'
})
  


export class CompraCreateComponent {
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

  usuario: Usuario = {
    id: 0,
    name: '',
    email: '',
    telephone: '',
    password: ''
  }

  fornecedor: Fornecedor = {
    id: 0,
    name: '',
    email: '',
    telephone: '',
    address: '',
    description: ''
  }

  produtoModel: ProdutoModel = {
    id: 0,
    name: '',
  }

  usuarioModel: UsuarioModel = {
    id: 0,
    name: '',
  };

  fornecedorModel: FornecedorModel = {
    id: 0,
    name: '',
  };

  itemVenda: ItemCompra = {
    product: this.produtoModel,
    amount: 0,
    discount: 0,
    finalPrice: 0,
  };

  itemsCompra: ItemCompra[] = [];

  items: AddItem[] = [];

  dataSource = new MatTableDataSource(this.items);

  compra: CompraCreate = {
    user: this.usuarioModel,
    supplier: this.fornecedorModel,
    itemsPurchases: this.items,
  };


  usuarios: Usuario[] = [];

  fornecedores: Fornecedor[] = [];

  produtos: Produto[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private fornecedorService: FornecedorService,
    private router: Router,
    private productService: ProdutoService,
    private service: CompraService
  ) {
    this.findAllUsers();
    this.findAllSuppliers();
    this.findAllProducts();
  }

  findAllUsers() {
    this.usuarioService.findAll().subscribe(
      (response) => {
        this.usuarios = response;
      },
      (err) => {
        this.usuarioService.mensagem('Erro ao buscar lista de usuarios');
      }
    );
  }

  findAllSuppliers() {
    this.fornecedorService.findAll().subscribe(
      (response) => {
        this.fornecedores = response;
      },
      (err) => {
        this.usuarioService.mensagem('Erro ao buscar lista de fornecedores');
      }
    );
  }

  findAllProducts() {
    this.productService.findAllByTypeFeedstock().subscribe((produtos) => {
      this.produtos = produtos;
    });
  }

  adicionarItem() {
    const user = new AddUser(this.usuarioModel.id!);

    const supplier = new AddSupplier(this.fornecedorModel.id!);

    const product = new AddProduct(
      this.produtoModel.id!,
      this.produtoModel.name!
    );

    const item = new AddItem(
      product,
      this.itemVenda.amount,
      this.itemVenda.discount
    );

    this.compra.user = user;
    this.compra.supplier = supplier;
    this.compra.itemsPurchases.push(item);
    this.dataSource.data = [...this.items];
  }

  removeItem(id: number) {
    this.items = this.items.filter((item) => item.product.id !== id);
    this.compra.itemsPurchases = this.items;
    this.dataSource.data = [...this.items];
  }

  // removeItem(itemVenda: ItemVenda){
  //   console.log(this.items)
  //   this.items.filter(item => item.product.id !== itemVenda.product.id);
  //   console.log(this.items)
  //   this.venda.itemsSale = [...this.items]
  //   this.dataSource.data = [...this.items];
  // }

  create(): void {
    this.service.create(this.compra).subscribe(
      (response) => {
        this.router.navigate(['compras']);
        this.service.mensagem('Compra cadastrada com sucesso!');
      },
      (err) => {
        this.service.mensagem('Erro ao cadastrar compra!');
      }
    );
  }

  cancel() {
    this.router.navigate(['compras']);
  }
}
