import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, delay, of } from "rxjs";

import { IDataService } from "../paging/idata-service";
import { PagingRequest } from "../paging/paging-request";
import { ResultDataDto } from "../model/result-data-dto";
import { DataDto } from "../model/data-dto";
import { cloneDeep } from "lodash-es";

@Injectable({
  providedIn: 'root',
})
export class ApiDataService implements IDataService<ResultDataDto> {
  cache: DataDto[] | undefined;
  delay = 300;

  constructor(private http: HttpClient) {}

  getPagingData1(page: number, pagesize: number): Observable<ResultDataDto> {
    if (!this.cache) {
      this.cache = this.getAllData();
    }

    const start = page * pagesize;
    const items = this.cache.slice(start, start + pagesize);

    const current = new ResultDataDto();
    current.count = this.cache.length;
    current.page = page;
    current.items = items;

    return of(current).pipe(delay(300));
  }

  getPagingData2(request: PagingRequest): Observable<ResultDataDto> {
    if (!this.cache) {
      this.cache = this.getAllData();
    }
    let list = cloneDeep(this.cache);

    for (let item of request.search.filters) {
      if (item.name === 'filter1') {
        list = list.filter(  x => x.name.startsWith(item.value)   );
      }
      if (item.name === 'filter2') {
        list = list.filter(x => x.customer.startsWith(item.value));
      }
    }

    const orderfield = request.search.orderfield;
    const orderdirection = request.search.orderdirection;
    if (orderdirection === 'asc') {
      list.sort((a: any, b: any) => {
        if (a[orderfield] < b[orderfield]) {
          return -1;
        }
        if (a[orderfield] > b[orderfield]) {
          return 1;
        }
        return 0;
      });

    }
    if (orderdirection === 'desc') {
      list.sort((a: any, b: any) => {
        if (a[orderfield] < b[orderfield]) {
          return 1;
        }
        if (a[orderfield] > b[orderfield]) {
          return -1;
        }
        return 0;
      });
    }

    const pagesize = request.search.pagesize;
    const start = request.page * pagesize;
    const items = list.slice(start, start + pagesize);

    const current = new ResultDataDto();
    current.count = list.length;
    current.page = request.page;
    current.items = items;

    return of(current).pipe(delay(300));
    //throw new Error('qwe');
  }

  private getAllData(): DataDto[] {
    const array = new Array<DataDto>();

    for (let i = 1; i <= 100; i++) {
      const d = new DataDto();
      const suff = i % 2 ? 'A' : 'B';
      d.id = i;
      d.name = `name ${i}`;
      d.customer = `customer${suff} ${i}`;
      d.mfield1 = `mfield1 ${i}`;
      d.mfield2 = `mfield2 ${i}`;
      d.mfield3 = `mfield3 ${i}`;
      d.mfield4 = `mfield4 ${i}`;
      d.mfield5 = `mfield5 ${i}`;
      array.push(d);
    }

    return array;
  }
}
