import { Signal, ResourceRef } from "@angular/core";

import { PagingRequest } from "./paging-request";
import { PagingRef } from "./paging-ref";

export class PagingResourceRef<T> {
  request!: Signal<PagingRequest>;
  reloadRequest!: (request: PagingRequest) => void;
  pagingRef!: PagingRef<T>;
  resourceRef!: ResourceRef<T>;
}
