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
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../../../../services/produto/produto.service';
import { CompraService } from '../../../../services/compra/compra.service';
import { Usuario } from '../compra-read/usuario.model';
import { Fornecedor } from '../compra-read/fornecedor.model';
import { Produto } from '../../produto/produto-read/produto.model';
import {
  FornecedorModel,
  ProdutoModel,
  UsuarioModel,
} from '../compra-create/compra-create.component';
import { AddItem } from '../compra-create/addItem.model';
import { CompraCreate } from '../compra-create/compra-create';
import { AddUser } from '../compra-create/add-user.model';
import { AddSupplier } from '../compra-create/add-supplier.model';
import { AddProduct } from '../compra-create/addProduct';
import { Compra } from '../compra-read/compra.model';
import { ItemCompra } from '../compra-create/item-compra.model';

registerLocaleData(localePt, 'pt-BR', localePtExtra);

@Component({
  selector: 'app-compra-delete',
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
  templateUrl: './compra-delete.component.html',
  styleUrl: './compra-delete.component.scss',
})
export class CompraDeleteComponent {
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

  usuario: Usuario = {
    id: 0,
    name: '',
    email: '',
    telephone: '',
    password: '',
  };

  fornecedor: Fornecedor = {
    id: 0,
    name: '',
    email: '',
    telephone: '',
    address: '',
    description: '',
  };

  produtoModel: ProdutoModel = {
    id: 0,
    name: '',
  };

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

  compra: Compra = {
    user: this.usuario,
    supplier: this.fornecedor,
    total: 0,
    subTotal: 0,
    itemsPurchases: this.itemsCompra,
    purchaseDate: new Date(),
  };

  usuarios: Usuario[] = [];

  fornecedores: Fornecedor[] = [];

  produtos: Produto[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: CompraService
  ) {
    this.compra.id = Number(this.route.snapshot.paramMap.get('id'));
    this.findById();
  }

  delete(): void {
    this.service.delete(this.compra.id!).subscribe(
      (response) => {
        this.router.navigate(['compras']);
        this.service.mensagem('Compra deletada com sucesso!');
      },
      (err) => {
        this.service.mensagem('Erro ao deletada compra!');
      }
    );
  }

  findById(): void {
    this.service.findById(this.compra.id!).subscribe(
      (response) => {
        this.compra = response;
        console.log(this.compra);
      },
      (err) => {
        this.service.mensagem('Compra nao encontrada');
      }
    );
  }

  cancel() {
    this.router.navigate(['compras']);
  }
}
