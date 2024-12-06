import { signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

import { NavigatorManager } from './navigator-manager';
import { PagingOptions } from './paging-options';
import { PagingRequest } from './paging-request';
import { PagingResourceRef } from './paging-resource-ref';
import { cloneDeep } from 'lodash-es';

// The PagingOptions<T> and PagingRequest objects contain the configuration passed to the function
// rxResourcePaging<T>(options: PagingOptions<T>): PagingResourceRef<T>. At the beginning of the
// rxResourcePaging function the PagingRequest object is cloned. Similarly the PagingRequest object
// is cloned if the reloadRequest method is called: (pagreq: PagingRequest). This happens if you want
// to do a new search specifying different filters and sorting.

export function rxResourcePaging<T>(options: PagingOptions<T>): PagingResourceRef<T> {
  const cloned = cloneDeep(options.request);
  const request = signal<PagingRequest>(cloned);

  const navigator = new NavigatorManager(request);
  const paging = navigator.createPagingRef();

  const resource = rxResource({
    request: request,
    loader: (param) => {
      const url = 'https://www.miosito.it';
      return options.service.getPagingData2(param.request)
        .pipe(
          tap(response => {
            const result = response as any;
            const count = result["count"];
            const pagesize = request().search.pagesize;
            navigator.setTotalCount(count, pagesize);
          })
        );
    },
  });

  const pagingResourceRef = {
    request: request.asReadonly(),
    reloadRequest: (pagreq: PagingRequest) => {
      const cloned = cloneDeep(pagreq);
      request.set(cloned);
    },
    pagingRef: paging,
    resourceRef: resource
  }

	return pagingResourceRef;
}
