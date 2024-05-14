import { Component } from '@angular/core';
import { Usuario } from './usuario.model';
import { UsuarioService } from '../../../../services/usuario/usuario.service';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-usuario-read',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink, MatFormFieldModule, MatInputModule, MatTableModule],
  templateUrl: './usuario-read.component.html',
  styleUrl: './usuario-read.component.scss'
})
export class UsuarioReadComponent {

  usuarios: Usuario[] = []

  constructor(private service: UsuarioService, private router: Router){
    this.findAll();
  }

  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'telephone',
    'action',
  ];

  findAll(){
    this.service.findAll().subscribe((response) => {
      this.usuarios = response
    }, err => {

    })
  }

  criarUsuarioComponent(){
    this.router.navigate(['usuarios/create'])
  }

}
