import {ChangeDetectorRef, Directive, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
import {ProductsFilterService} from "../services/products-filter/products-filter.service";
import {debounceTime, Subject, takeUntil} from "rxjs";

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective implements OnInit, OnDestroy {
  @Input('appHighlight') price = 0;

  @HostBinding('class.highlighted') highlighted = false;

  private destroy$: Subject<void> = new Subject();

  constructor(private cd: ChangeDetectorRef,
              private productsFilterService: ProductsFilterService) {
  }

  public ngOnInit(): void {
    this.productsFilterService.actualPrice$.pipe(debounceTime(500), takeUntil(this.destroy$)).subscribe((value) => {
      // console.log('Got value', value);
      this.cd.markForCheck();

      if (value === null) {
        this.highlighted = false;
        return;
      }

      // Highlight all products with prices above value
      this.highlighted = this.price >= value;
    });
  }


  public ngOnDestroy(): void {
    console.log('Directive destroyed');
    this.destroy$.next();
    this.destroy$.complete();
  }

}
