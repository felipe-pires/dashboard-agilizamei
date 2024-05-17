import { Component, LOCALE_ID } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../template/header/header.component';
import { NavComponent } from '../../template/nav/nav.component';
import { RouterOutlet } from '@angular/router';
import { SaleByDateComponent } from '../../charts/sale-by-date/sale-by-date.component';
import { ChartsService } from '../../../services/charts/charts.service';
import { format } from 'date-fns-tz';

import localePt from '@angular/common/locales/pt';
import localePtExtra from '@angular/common/locales/extra/pt';
import { CommonModule, registerLocaleData } from '@angular/common';

registerLocaleData(localePt, 'pt-BR', localePtExtra);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    HeaderComponent,
    NavComponent,
    RouterOutlet,
    SaleByDateComponent,
    CommonModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})


export class HomeComponent {
  totalVendasHoje = 0;

  totalVendidoHoje = 0;

  totalDistinctCustomers = 0;

  constructor(private service: ChartsService) {
    this.salesToday();
    this.totalToday();
    this.totalCustomer();
  }

  salesToday() {
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    this.service.salesByDate(startDate, endDate).subscribe((resposta) => {
      this.totalVendasHoje = resposta[0].total;
    });
  }

  totalToday() {
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    this.service.soldByDate(startDate, endDate).subscribe((resposta) => {
      this.totalVendidoHoje = resposta;
    });
  }

  totalCustomer() {
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    this.service.totalCustomer(startDate, endDate).subscribe((resposta) => {
      this.totalDistinctCustomers = resposta;
    });
  }
}
