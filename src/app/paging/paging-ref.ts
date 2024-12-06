import { Signal } from "@angular/core";

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
