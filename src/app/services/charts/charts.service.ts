import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../environments/enviroments';
import { Observable } from 'rxjs';
import { TotalByDate } from '../../types/sale-date.type';
import { TotalProductByDate } from '../../types/product-date.type';
import { TotalGainsAndCosts } from '../../types/total-gains-costs.type';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  baseUrl = enviroment.baseUrl;

  constructor(private http: HttpClient) {}

  salesByDate(start: Date, end: Date): Observable<TotalByDate[]> {
    const url = `${
      this.baseUrl
    }/report?type=salesByDate&start=${start.getTime()}&end=${end.getTime()}`;
    return this.http.get<TotalByDate[]>(url);
  }

  salesByMonth(start: Date, end: Date): Observable<TotalByDate[]> {
    const url = `${
      this.baseUrl
    }/report?type=salesByMonth&start=${start.getTime()}&end=${end.getTime()}`;
    return this.http.get<TotalByDate[]>(url);
  }

  salesByYear(start: Date, end: Date): Observable<TotalByDate[]> {
    const url = `${
      this.baseUrl
    }/report?type=salesByYear&start=${start.getTime()}&end=${end.getTime()}`;
    return this.http.get<TotalByDate[]>(url);
  }

  bestSellingProductsByDate(start: Date, end: Date): Observable<TotalProductByDate[]> {
    const url = `${
      this.baseUrl
    }/report?type=bestSellingProductsByDate&start=${start.getTime()}&end=${end.getTime()}`;
    return this.http.get<TotalProductByDate[]>(url);
  }

  totalGainsAndCosts(): Observable<TotalGainsAndCosts> {
    const url = `${
      this.baseUrl
    }/report?type=totalGainsAndCosts`;
    return this.http.get<TotalGainsAndCosts>(url);
  }

  bestSellingProductsByMonth(
    start: Date,
    end: Date
  ): Observable<TotalProductByDate[]> {
    const url = `${
      this.baseUrl
    }/report?type=bestSellingProductsByMonth&start=${start.getTime()}&end=${end.getTime()}`;
    return this.http.get<TotalProductByDate[]>(url);
  }

  bestSellingProductsByYear(start: Date, end: Date): Observable<TotalProductByDate[]> {
    const url = `${
      this.baseUrl
    }/report?type=bestSellingProductsByYear&start=${start.getTime()}&end=${end.getTime()}`;
    return this.http.get<TotalProductByDate[]>(url);
  }

  soldByDate(start: Date, end: Date): Observable<number> {
    const url = `${
      this.baseUrl
    }/report?type=totalSoldByDate&start=${start.getTime()}&end=${end.getTime()}`;
    return this.http.get<number>(url);
  }

  totalCustomer(start: Date, end: Date): Observable<number> {
    const url = `${
      this.baseUrl
    }/report?type=totalDistinctCustomers&start=${start.getTime()}&end=${end.getTime()}`;
    return this.http.get<number>(url);
  }
}
