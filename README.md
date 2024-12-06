# rxResourcePaging

[My LinkedIn profile](https://www.linkedin.com/in/stefano-marchisio-sviluppatore-web-angular-javascript-aspnet-fullstack/)

[Live Demo](https://www.stefanomarchisio.it/AppResource/index.html)

 The **rxResourcePaging** signal wraps a **rxResource** signal. It exposes properties and methods for paging data: count, minpage, maxpage, hasFirst, hasPrevious, hasNext, hasLast, first(), previous(), next(), last(), goToPage(page: number).

![rxResourcePaging](/screenshot/image1.png)

```html

...

<p>
  <button (click)="onNavButtonClick('first')" [disabled]="!paging.hasFirst()">
    First
  </button>&nbsp;
  <button (click)="onNavButtonClick('previous')" [disabled]="!paging.hasPrevious()">
    Previous
  </button>&nbsp;
    ({{ data.request().page }} - {{ paging.maxpage() + 1 }}/{{ paging.count() }})&nbsp;
  <button (click)="onNavButtonClick('next')" [disabled]="!paging.hasNext()">
    Next
  </button>&nbsp;
  <button (click)="onNavButtonClick('last')" [disabled]="!paging.hasLast()">
    Last
  </button>&nbsp;
</p>

<p>
  @if (resource.hasValue()) {
   <div>
      @for (data of resource.value()?.items; track data.id) {
      <div>
        {{ data.id }}&nbsp;
        {{ data.name }}&nbsp;
        {{ data.customer }}&nbsp;
      </div>
      }
    </div>
    } @else if (resource.status() === status.Error) {
    <span>The request failed. Reason: {{ resource.error() }}</span>
    }
</p>

...

```

Inside the constructor, the function **rxResourcePaging(this.options)** is called, which returns a **PagingResourceRef<T>** object. The signal-like properties are then used in the template.

```js
export class Page4Component implements OnInit {
  title = 'Page4';
  options: PagingOptions<ResultDataDto>;
  data: PagingResourceRef<ResultDataDto>;
  paging: PagingRef<ResultDataDto>;
  resource: ResourceRef<ResultDataDto>;
  status = ResourceStatus;
  
  ...

  constructor(private service: ApiDataService) {
    const url = 'https://www.miosito.it';
    this.options = new PagingOptions<ResultDataDto>(service, url);
    this.data = rxResourcePaging(this.options);
    this.paging = this.data.pagingRef;
    this.resource = this.data.resourceRef;
  }

  ...

}
```

The **PagingOptions<T>** and **PagingRequest** objects contain the configuration passed to the function **rxResourcePaging<T>(options: PagingOptions<T>): PagingResourceRef<T>**. At the beginning of the **rxResourcePaging** function the **PagingRequest** object is cloned. Similarly the **PagingRequest** object is cloned if the **reloadRequest** method is called. This happens if you want to do a new search specifying different filters and sorting.

```js
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
```
The **rxResourcePaging** function returns an object of type **PagingResourceRef<T>**.

```js
export class PagingResourceRef<T> {
  request!: Signal<PagingRequest>;
  reloadRequest!: (request: PagingRequest) => void;
  pagingRef!: PagingRef<T>;
  resourceRef!: ResourceRef<T>;
}
```
The **PagingResourceRef<T>** object contains 3 properties and one method. The **ResourceRef<T>** object is the object returned by the Angular **rxResource** function. The **PagingRef<T>** object instead contains the properties and methods for navigation.

```js
export interface PagingRef<T> {
  count: Signal<number>,
  minpage: Signal<number>,
  maxpage: Signal<number>,

  hasFirst: Signal<boolean>,
  hasPrevious: Signal<boolean>,
  hasNext: Signal<boolean>,
  hasLast: Signal<boolean>,

  first(): boolean;
  previous(): boolean;
  next(): boolean;
  last(): boolean;

  goToPage(page: number): boolean;
}
```
