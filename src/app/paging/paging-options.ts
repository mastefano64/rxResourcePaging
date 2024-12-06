import { IDataService } from './idata-service';
import { PagingRequest } from './paging-request';

export class PagingOptions<T> {
  service: IDataService<T>;
  request = new PagingRequest();

  constructor(service: IDataService<T>, url: string) {
    this.service = service;
    this.request.url = url;
  }

}
