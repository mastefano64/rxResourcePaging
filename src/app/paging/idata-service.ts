import { Observable } from "rxjs";
import { PagingRequest } from "./paging-request";

export interface IDataService<T> {
  getPagingData1(page: number, pagesize: number): Observable<T>;
  getPagingData2(request: PagingRequest): Observable<T>;
}
