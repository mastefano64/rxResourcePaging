export type type = 'string' | 'number' | 'boolean';
export type operator = 'equal';

export class PagingRequest {
  url = '';
  page = 0;
  search = new PagingFilterAndSort();
}

export class PagingFilterAndSort {
  filters: Filter[] = [];
  orderfield = '';
  orderdirection = '';
  pagesize = 10;
}

export class Filter {
  name = '';
  type: type = 'string';
  operator: operator = 'equal';
  value: any;
}
