import { Component, OnInit, ResourceStatus, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { PagingRequest } from '../../paging/paging-request';
import { ApiDataService } from '../../service/api-data-service';

@Component({
    selector: 'app-page1',
    templateUrl: './page1.component.html',
    styleUrl: './page1.component.scss',
    imports: []
})
export class Page1Component implements OnInit {
  title = 'Page1';
  status = ResourceStatus;
  page = signal<number>(0);
  pagesize = 10;

  resource = rxResource({
    request: this.page,
    loader: (param) => {
      const url = 'https://www.miosito.it';
      return this.service.getPagingData1(param.request, this.pagesize);
    },
  });

  constructor(private service: ApiDataService) { }

  ngOnInit(): void {

  }

  onButtonClick(page: number): void {
    if (page === 1) {
      this.page.set(1);
    }
    if (page === 2) {
      this.page.set(2);
    }
    if (page === 3) {
      this.page.set(3);
    }
  }
}
