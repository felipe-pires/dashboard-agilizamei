import { Component, ViewChild } from '@angular/core';
import { subDays, subMonths } from 'date-fns';
import { ChartsService } from '../../../services/charts/charts.service';
import { TotalByDate } from '../../../types/sale-date.type';


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
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  colors: string[];
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'app-sale-by-month',
  standalone: true,
  imports: [
    NgApexchartsModule
  ],
  templateUrl: './sale-by-month.component.html',
  styleUrl: './sale-by-month.component.scss'
})

export class SaleByMonthComponent {

  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> = {};

  end: Date = new Date();
  start: Date = subDays(this.end, 7);

  totalByDate: TotalByDate[] = [];

  constructor(private service: ChartsService) {
    this.salesByDate();
  }

  salesByDate() {
    const endDate = this.end = new Date();
    const startDate = subMonths(this.end, 12);
    
    this.service.salesByMonth(startDate, endDate).subscribe((resposta) => {

      resposta.sort((a, b) => {
        const dateA = new Date(a.date.split('-').reverse().join('-'));
        const dateB = new Date(b.date.split('-').reverse().join('-'));
        return dateA.getTime() - dateB.getTime();
      });
     
      this.chartOptions = {
        series: [
          {
            color: '#008FFB',
            name: 'Vendas',
            data: resposta.map((item) => item.total), // Supondo que 'valor' seja o campo que você quer usar no gráfico
          },
        ],
        chart: {
          type: 'bar',
          height: 350,
        },
        xaxis: {
          categories: resposta.map((item) => item.date),

          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
        },
        colors: ['#DDD'],
      };
    });
  }
}

