import { Component, ViewChild } from '@angular/core';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill,
  NgApexchartsModule,
  ApexResponsive,
  ApexLegend,
} from 'ng-apexcharts';
import { ChartsService } from '../../../services/charts/charts.service';
import { subDays } from 'date-fns';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  legend: ApexLegend;
  colors: string[];
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-best-selling-products-by-month',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './best-selling-products-by-month.component.html',
  styleUrl: './best-selling-products-by-month.component.scss'
})
export class BestSellingProductsByMonthComponent {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> = {};

  end: Date = new Date();
  start: Date = subDays(this.end, 7);

  constructor(private service: ChartsService) {
    this.salesByDate();
  }

  salesByDate() {
    const endDate = new Date();
    const startDate = subDays(endDate, 30);

    this.service
      .bestSellingProductsByMonth(startDate, endDate)
      .subscribe((response) => {
        const productNames = Array.from(new Set(response.map(item => item.name)));
        const dates = Array.from(new Set(response.map(item => item.date))).sort();
        
        const seriesData = productNames.map(name => ({
          name,
          data: dates.map(date => {
            const productData = response.find(item => item.name === name && item.date === date);
            return productData ? productData.total : 0;
          })
        }));

        this.chartOptions = {
          series: seriesData,
          chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            stackType: '100%',
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: {
                  position: 'bottom',
                  offsetX: -10,
                  offsetY: 0,
                },
              },
            },
          ],
          xaxis: {
            categories: dates,
          },
          fill: {
            opacity: 1,
          },
          legend: {
            position: 'right',
            offsetX: 0,
            offsetY: 50,
          },
          colors: ['#DDD'],
        };
      });
  }
}
