import { Component, OnInit, ResourceRef, ResourceStatus, signal, ChangeDetectionStrategy  } from '@angular/core';

import { rxResourcePaging } from '../../paging/rx-resource-paging';
import { PagingOptions } from '../../paging/paging-options';
import { PagingResourceRef } from '../../paging/paging-resource-ref';
import { PagingRef } from '../../paging/paging-ref';
import { ApiDataService } from '../../service/api-data-service';
import { ResultDataDto } from '../../model/result-data-dto';

// https://medium.com/@invictarasolutions/binding-select-element-to-object-in-angular-16-a-comprehensive-tutorial-ffceb7cf82d7

@Component({
    selector: 'app-page3',
    templateUrl: './page3.component.html',
    styleUrl: './page3.component.scss',
    imports: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Page3Component implements OnInit {
  title = 'Page3';
  data: PagingResourceRef<ResultDataDto>;
  paging: PagingRef<ResultDataDto>;
  resource: ResourceRef<ResultDataDto>;
  status = ResourceStatus;

  constructor(private service: ApiDataService) {
    const url = 'https://www.miosito.it';
    const options = new PagingOptions<ResultDataDto>(service, url);
    this.data = rxResourcePaging(options);
    this.paging = this.data.pagingRef;
    this.resource = this.data.resourceRef;
  }

  ngOnInit(): void {

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
}
