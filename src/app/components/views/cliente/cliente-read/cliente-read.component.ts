import { Component } from '@angular/core';
import { Cliente } from './cliente.model';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
// import { MatFormField } from '@angular/material/form-field';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ClienteService } from '../../../../services/cliente/cliente.service';

@Component({
  selector: 'app-cliente-read',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink, MatFormFieldModule, MatInputModule, MatTableModule],
  templateUrl: './cliente-read.component.html',
  styleUrl: './cliente-read.component.scss'
})
export class ClienteReadComponent {

  constructor(private service: ClienteService, private router: Router){
    this.findAll();
  }

  clientes: Cliente[] = [];

  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'telephone',
    'address',
    'action',
  ];

  findAll(){
    this.service.findAll().subscribe((response) => {
      this.clientes = response
    },err => {
      this.service.mensagem("Erro ao buscar lista de clientes")
    })
  }

  criarClienteComponent(){
    this.router.navigate(['clientes/create'])
  }

}
 