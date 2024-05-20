import { Component, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { LoginService } from '../../../services/login/login.service';
import { CommonModule } from '@angular/common';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  @ViewChild('drawer') drawer!: MatDrawer;

  constructor(private service: LoginService, private router: Router) {}

  toggleDrawer(): void {
    if (this.drawer) {
      this.drawer.toggle();
    }
  }
  isLogin() {
    return this.service.isLogin();
  }

  logout() {
    return this.service.logout();
  }

  getContentClass() {
    return this.router.url.includes('/login')
      ? 'content-login'
      : 'content-default';
  }
}
