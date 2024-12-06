import { Component, OnInit, ResourceRef, ResourceStatus, model, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { rxResourcePaging } from '../../paging/rx-resource-paging';
import { PagingOptions } from '../../paging/paging-options';
import { PagingRequest, Filter } from '../../paging/paging-request';
import { PagingResourceRef } from '../../paging/paging-resource-ref';
import { PagingRef } from '../../paging/paging-ref';
import { ApiDataService } from '../../service/api-data-service';
import { ResultDataDto } from '../../model/result-data-dto';

// https://medium.com/@invictarasolutions/binding-select-element-to-object-in-angular-16-a-comprehensive-tutorial-ffceb7cf82d7

@Component({
    selector: 'app-page4',
    templateUrl: './page4.component.html',
    styleUrl: './page4.component.scss',
    imports: [ FormsModule ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Page4Component implements OnInit {
  title = 'Page4';
  options: PagingOptions<ResultDataDto>;
  data: PagingResourceRef<ResultDataDto>;
  paging: PagingRef<ResultDataDto>;
  resource: ResourceRef<ResultDataDto>;
  status = ResourceStatus;
  filter1 = model('-1');
  filter2 = model('-1');
  order = model('-1');

  constructor(private service: ApiDataService) {
    const url = 'https://www.miosito.it';
    this.options = new PagingOptions<ResultDataDto>(service, url);
    this.data = rxResourcePaging(this.options);
    this.paging = this.data.pagingRef;
    this.resource = this.data.resourceRef;
  }

  ngOnInit(): void {

  }

  onChangeFilter1(): void {
    const request = this.options.request;
    request.page = 0;
    this.menageFilter(request, 'filter1', this.filter1());
    this.data.reloadRequest(request);
  }

  onChangeFilter2(): void {
    const request = this.options.request;
    request.page = 0;
    this.menageFilter(request, 'filter2', this.filter2());
    this.data.reloadRequest(request);
  }

  onChangeOrder(): void {
    const request = this.options.request;
    request.page = 0;
    if (this.order() === '-1') {
      request.search.orderfield = '';
      request.search.orderdirection = '';
    }
    if (this.order() === '1') {
      request.search.orderfield = 'name';
      request.search.orderdirection = 'asc';
    }
    if (this.order() === '2') {
      request.search.orderfield = 'customer';
      request.search.orderdirection = 'asc';
    }
    if (this.order() === '3') {
      request.search.orderfield = 'name';
      request.search.orderdirection = 'desc';
    }
    if (this.order() === '4') {
      request.search.orderfield = 'customer';
      request.search.orderdirection = 'desc';
    }
    this.data.reloadRequest(request);
  }

  menageFilter(request: PagingRequest, name: string,
                value: string): void {
    const serarch = request.search.filters;
    const found = serarch.find(x => x.name === name);
    if (found) {
      const pos = serarch.indexOf(found);
      if (value === '-1') {
        serarch.splice(pos, 1);
      } else {
        found.value = value;
      }
    } else {
      if (value !== '-1') {
        const filter = new Filter();
        filter.name = name;
        filter.type = 'string';
        filter.operator = 'equal';
        filter.value = value;
        request.search.filters.push(filter);
      }
    }
  }

  onNavButtonClick(op: string): void {
    if (op === 'first') {
      this.paging.first();
    }
    if (op === 'previous') {
      this.paging.previous();
    }
    if (op === 'next') {
      this.paging.next();
    }
    if (op === 'last') {
      this.paging.last();
    }
  }

  onGoToPageClick(page: number): void {
    if (this.paging.goToPage(page) === false) {
      alert('Page not found!');
    }
  }
}

