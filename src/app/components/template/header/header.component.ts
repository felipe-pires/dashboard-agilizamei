import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../../services/login/login.service';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, CommonModule],
  providers: [NavComponent,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  mostrarMenu = false;

  constructor(
    private service: LoginService,
    private navComponent: NavComponent
  ) {
    this.service.mostrarMenu.subscribe((resposta) => {
      this.mostrarMenu = resposta;
    });
  }

  toggleMenu(): void {
    if (this.navComponent) {
      alert('teste')
      this.navComponent.toggleDrawer();
      alert('teste')
    } else {
      console.error('NavComponent não está definido.');
    }
  }

  teste() {
    return this.service.isLogin();
  }
}
