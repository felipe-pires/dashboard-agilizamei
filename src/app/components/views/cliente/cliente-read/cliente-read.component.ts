import { Component } from '@angular/core';
import { Cliente } from './cliente.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
// import { MatFormField } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ClienteService } from '../../../../services/cliente/cliente.service';

export interface PeriodicElement {
  id?: number;
  name: string;
  email: string;
  telephone: string;
  address: string;
}

@Component({
  selector: 'app-cliente-read',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
  ],
  templateUrl: './cliente-read.component.html',
  styleUrl: './cliente-read.component.scss',
})
export class ClienteReadComponent {
  constructor(private service: ClienteService, private router: Router) {
    this.findAll();
  }

  clientes: Cliente[] = [];

  periodic: PeriodicElement[] = [];

  dataSource = new MatTableDataSource(this.clientes);

  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'telephone',
    'address',
    'action',
  ];

  findAll() {
    this.service.findAll().subscribe(
      (response) => {
        this.clientes = response;
        this.periodic = this.clientes;
        this.dataSource = new MatTableDataSource(this.periodic);
      },
      (err) => {
        this.service.mensagem('Erro ao buscar lista de clientes');
      }
    );
  }

  criarClienteComponent() {
    this.router.navigate(['clientes/create']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
