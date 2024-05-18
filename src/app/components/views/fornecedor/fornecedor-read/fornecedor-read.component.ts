import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { Fornecedor } from './fornecedor.model';
import { FornecedorService } from '../../../../services/fornecedor/fornecedor.service';

export interface PeriodicElement {
  id?: number;
  name: string;
  email: string;
  telephone: string;
  address: string;
  description: string;
}

@Component({
  selector: 'app-fornecedor-read',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
  ],
  templateUrl: './fornecedor-read.component.html',
  styleUrl: './fornecedor-read.component.scss',
})
export class FornecedorReadComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'telephone',
    'address',
    'description',
    'action',
  ];

  fornecedores: Fornecedor[] = [];

  periodic: PeriodicElement[] = [];

  dataSource = new MatTableDataSource(this.fornecedores);

  constructor(private router: Router, private service: FornecedorService) {
    this.findAll()
  }

  findAll() {
    this.service.findAll().subscribe(
      (response) => {
        this.fornecedores = response;
        this.periodic = this.fornecedores;
        this.dataSource = new MatTableDataSource(this.periodic);
      },
      (err) => {
        this.service.mensagem('Erro ao buscar lista de clientes');
      }
    );
  }

  criarFornecedorComponent() {
    this.router.navigate(['fornecedores/create']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
