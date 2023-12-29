import {Injectable, OnDestroy} from '@angular/core';
import {BaseComponent} from "../../base/base.component";
import {Subject} from "rxjs";

@Injectable()
export class ProductsFilterService extends BaseComponent implements OnDestroy {
  public actualPrice$: Subject<number | null> = new Subject<number | null>();

  constructor() {
    super();
  }

  public override ngOnDestroy() {
    super.ngOnDestroy();
    this.actualPrice$.complete();
  }
}
