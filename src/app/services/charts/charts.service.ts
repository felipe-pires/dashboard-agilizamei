import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../environments/enviroments';
import { Observable } from 'rxjs';
import { TotalByDate } from '../../types/sale-date.type';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  baseUrl = enviroment.baseUrl;



  constructor(private http: HttpClient) {}

  salesByDate(start: Date, end: Date): Observable<TotalByDate[]> {
    const url = `${this.baseUrl}/report?type=salesByDate&start=${start.getTime()}&end=${end.getTime()}`;
    return this.http.get<TotalByDate[]>(url);
  }


  soldByDate(start: Date, end: Date): Observable<number> {
    const url = `${this.baseUrl}/report?type=totalSoldByDate&start=${start.getTime()}&end=${end.getTime()}`;
    return this.http.get<number>(url);
  }

  totalCustomer(start: Date, end: Date): Observable<number> {
    const url = `${this.baseUrl}/report?type=totalDistinctCustomers&start=${start.getTime()}&end=${end.getTime()}`;
    return this.http.get<number>(url);
  }


}
