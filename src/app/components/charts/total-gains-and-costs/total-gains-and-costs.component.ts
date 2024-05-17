import { Component, ViewChild } from '@angular/core';

// import {
//   ApexAxisChartSeries,
//   ApexDataLabels,
//   ApexPlotOptions,
//   ApexYAxis,
//   ApexTitleSubtitle,
//   ApexXAxis,
//   ApexFill,
// } from 'ng-apexcharts';

import { ChartsService } from '../../../services/charts/charts.service';
import { TotalByDate } from '../../../types/sale-date.type';
import { subDays } from 'date-fns';

import {
  ApexChart,
  ChartComponent,
  ApexFill,
  NgApexchartsModule,
  ApexResponsive,
  ApexNonAxisChartSeries,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: any;
  responsive: ApexResponsive[];
  colors: any;
};

// export type ChartOptions = {
//   series: ApexAxisChartSeries;
//   labels: string[];
//   responsive: ApexResponsive[];
//   chart: ApexChart;
//   dataLabels: ApexDataLabels;
//   plotOptions: ApexPlotOptions;
//   yaxis: ApexYAxis;
//   xaxis: ApexXAxis;
//   fill: ApexFill;
//   colors: string[];
//   title: ApexTitleSubtitle;
// };

@Component({
  selector: 'app-total-gains-and-costs',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './total-gains-and-costs.component.html',
  styleUrl: './total-gains-and-costs.component.scss',
})
export class TotalGainsAndCostsComponent {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  constructor(private service: ChartsService) {
    this.teste();
  }

  teste() {
    this.service.totalGainsAndCosts().subscribe((response) => {
      const ganhos = response.totalGains.toFixed(2);

      const custos = response.totalCosts.toFixed(2);
      this.chartOptions = {
      
        series: [Number(ganhos), Number(custos)],
        chart: {
          type: 'donut',
        },
        labels: ['Ganhos', 'Custos'],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
        colors: ['#8DECB4','#EE4E4E']
      };
    });
  }
}
