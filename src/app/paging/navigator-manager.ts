import { signal, WritableSignal } from '@angular/core';

import { PagingRequest } from "./paging-request";
import { PagingRef } from "./paging-ref";

export class NavigatorManager<T> {
  private haserror = signal<boolean>(true);
  private count = signal<number>(0);
  private minpage = signal<number>(0);
  private maxpage = signal<number>(0);
  private hasFirst = signal<boolean>(false);
  private hasPrevious = signal<boolean>(false);
  private hasNext = signal<boolean>(false);
  private hasLast = signal<boolean>(false);

  constructor(private request: WritableSignal<PagingRequest>) { }

  hasFirstCheck(): boolean {
    let valret = true;
    const pg = this.request().page;
    if (this.minpage() === -1 || pg <= this.minpage()) {
      valret = false;
    }
    return valret;
  }

  first(): boolean {
    let valret = false;
    if (this.hasFirstCheck() === false) {
      return valret;
    }
    valret = true;
    this.request().page = this.minpage();
    this.triggerRequest();
    this.reset();
    return valret;
  }

  hasPreviousCheck(): boolean {
    let valret = true;
    const pg = this.request().page;
    if (this.minpage() === -1 || pg <= this.minpage()) {
      valret = false;
    }
    return valret;
  }

  previous(): boolean {
    let valret = false;
    if (this.hasPreviousCheck() === false) {
      return valret;
    }
    valret = true;
    const pg = this.request().page;
    this.request().page = pg - 1;
    this.triggerRequest();
    this.reset();
    return valret;
  }

  hasNextCheck(): boolean {
    let valret = true;
    const pg = this.request().page;
    if (this.maxpage() === -1 || pg >= this.maxpage()) {
      valret = false;
    }
    return valret;
  }

  next(): boolean {
    let valret = false;
    if (this.hasNextCheck() === false) {
      return valret;
    }
    valret = true;
    const pg = this.request().page;
    this.request().page = pg + 1;
    this.triggerRequest();
    this.reset();
    return valret;
  }

  hasLastCheck(): boolean {
    let valret = true;
    const pg = this.request().page;
    if (this.maxpage() === -1 || pg >= this.maxpage()) {
      valret = false;
    }
    return valret;
  }

  last(): boolean {
    let valret = false;
    if (this.hasLastCheck() === false) {
      return valret;
    }
    valret = true;
    this.request().page = this.maxpage();
    this.triggerRequest();
    this.reset();
    return valret;
  }

  goToPage(page: number): boolean {
    let valret = false;
    if (this.minpage() !== -1 && this.maxpage() !== -1) {
      if (page >= this.minpage() && page <= this.maxpage()) {
        valret = true;
        this.request().page = page;
        this.triggerRequest();
        this.reset();
      }
    }
    return valret;
  }

  triggerRequest(): void {
    const req = { ...this.request() };
    this.request.set(req);
  }

  setTotalCount(count: number, pagesize: number): void {
    if (count === undefined || count === 0) {
      this.count.set(0);
      this.minpage.set(-1);
      this.maxpage.set(-1);
      this.haserror.set(true);
      return;
    }
    const value = count / pagesize;
    this.count.set(count);
    this.minpage.set(0);
    this.maxpage.set(Math.ceil(value) - 1);
    this.hasFirst.set(this.hasFirstCheck());
    this.hasPrevious.set(this.hasPreviousCheck());
    this.hasNext.set(this.hasNextCheck());
    this.hasLast.set(this.hasLastCheck());
    this.haserror.set(false);
    this.debug();
  }

  reset(): void {
    this.count.set(0);
    this.minpage.set(-1);
    this.maxpage.set(-1);
    this.hasFirst.set(false);
    this.hasPrevious.set(false);
    this.hasNext.set(false);
    this.hasLast.set(false);
    this.haserror.set(false);
  }

  debug(): void {
    console.log('minPage: ' + this.minpage());
    console.log('maxPage: ' + this.maxpage());
    console.log('hasFirst: ' + this.hasFirst());
    console.log('hasPrevious: ' + this.hasPrevious());
    console.log('hasNext: ' + this.hasNext());
    console.log('hasLast: ' + this.hasLast());
  }

  createPagingRef(): PagingRef<T> {
    const that = this;
    const pr = {
      count: this.count.asReadonly(),
      minpage: this.minpage.asReadonly(),
      maxpage: this.maxpage.asReadonly(),

      hasFirst: this.hasFirst.asReadonly(),
      hasPrevious: this.hasPrevious.asReadonly(),
      hasNext: this.hasNext.asReadonly(),
      hasLast: this.hasLast.asReadonly(),

      first: this.first.bind(that),
      previous: this.previous.bind(that),
      next: this.next.bind(that),
      last: this.last.bind(that),
      goToPage: this.goToPage.bind(that),
    };

    return pr;
  }
}
