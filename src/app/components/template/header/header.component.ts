import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../../services/login/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
   mostrarMenu = false;

  constructor(private service: LoginService) {
    this.service.mostrarMenu.subscribe((resposta) => {
      this.mostrarMenu = resposta;
    });

  }
  teste(){
    return this.service.isLogin()
  }

}
