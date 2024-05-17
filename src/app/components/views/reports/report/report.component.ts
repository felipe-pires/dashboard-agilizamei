import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SaleByMonthComponent } from '../../../charts/sale-by-month/sale-by-month.component';
import { SaleByYearComponent } from '../../../charts/sale-by-year/sale-by-year.component';
import { SaleByDateComponent } from '../../../charts/sale-by-date/sale-by-date.component';
import { BestSellingProductsByDateComponent } from '../../../charts/best-selling-products-by-date/best-selling-products-by-date.component';
import { BestSellingProductsByMonthComponent } from '../../../charts/best-selling-products-by-month/best-selling-products-by-month.component';
import { BestSellingProductsByYearComponent } from '../../../charts/best-selling-products-by-year/best-selling-products-by-year.component';
import { TotalGainsAndCostsComponent } from '../../../charts/total-gains-and-costs/total-gains-and-costs.component';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    MatCardModule,
    SaleByYearComponent,
    SaleByDateComponent,
    SaleByMonthComponent,
    BestSellingProductsByDateComponent,
    BestSellingProductsByMonthComponent,
    BestSellingProductsByYearComponent,
    TotalGainsAndCostsComponent
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {

}
