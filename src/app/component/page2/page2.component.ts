import { Component, OnInit, ResourceRef, ResourceStatus, signal, ChangeDetectionStrategy } from '@angular/core';

import { rxResourcePaging } from '../../paging/rx-resource-paging';
import { PagingOptions } from '../../paging/paging-options';
import { PagingRef } from '../../paging/paging-ref';
import { ApiDataService } from '../../service/api-data-service';
import { ResultDataDto } from '../../model/result-data-dto';

@Component({
    selector: 'app-page2',
    templateUrl: './page2.component.html',
    styleUrl: './page2.component.scss',
    imports: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Page2Component implements OnInit {
  title = 'Page2';
  paging: PagingRef<ResultDataDto>;
  resource: ResourceRef<ResultDataDto>;
  status = ResourceStatus;

  constructor(private service: ApiDataService) {
    const url = 'https://www.miosito.it';
    const options = new PagingOptions<ResultDataDto>(service, url);
    const data = rxResourcePaging(options);
    this.paging = data.pagingRef;
    this.resource = data.resourceRef;
  }

  ngOnInit(): void {

  }

  onButtonClick(page: number): void {
    // if (page === 1) {
    //   this.page.set(1);
    // }
    // if (page === 2) {
    //   this.page.set(2);
    // }
    // if (page === 3) {
    //   this.page.set(3);
    // }
  }
}
