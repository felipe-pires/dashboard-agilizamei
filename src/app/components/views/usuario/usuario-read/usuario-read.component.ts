import { Component } from '@angular/core';
import { Usuario } from './usuario.model';
import { UsuarioService } from '../../../../services/usuario/usuario.service';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

export interface PeriodicElement {
  id?: number;
  name: string;
  email: string;
  telephone: string;
  password: string;
}

@Component({
  selector: 'app-usuario-read',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
  ],
  templateUrl: './usuario-read.component.html',
  styleUrl: './usuario-read.component.scss',
})
export class UsuarioReadComponent {
  usuarios: Usuario[] = [];

  periodic: PeriodicElement[] = [];

  dataSource = new MatTableDataSource(this.usuarios);

  constructor(private service: UsuarioService, private router: Router) {
    this.findAll();
  }

  displayedColumns: string[] = ['id', 'name', 'email', 'telephone', 'action'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  findAll() {
    this.service.findAll().subscribe(
      (response) => {
        this.usuarios = response;
        this.periodic = this.usuarios;
        this.dataSource = new MatTableDataSource(this.periodic);
      },
      (err) => {}
    );
  }

  criarUsuarioComponent() {
    this.router.navigate(['usuarios/create']);
  }
}
