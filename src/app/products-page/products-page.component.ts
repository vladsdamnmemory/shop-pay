import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BaseComponent} from "../base/base.component";
import {ProductsManagementService} from "../services/products-management/products-management.service";
import {catchError, EMPTY, Observable} from "rxjs";
import {ProductType} from "../types/product.type";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {ProductItemComponent} from "../product-item/product-item.component";
import {FormsModule} from "@angular/forms";
import {HighlightDirective} from "../directives/highlight.directive";
import {ProductsFilterService} from "../services/products-filter/products-filter.service";

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [
    AsyncPipe,
    ProductItemComponent,
    HighlightDirective,
    NgForOf,
    NgIf,
    FormsModule,
    NgClass
  ],
  providers: [ProductsManagementService, ProductsFilterService],
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsPageComponent extends BaseComponent implements OnInit {
  public products$: Observable<ProductType[]> | undefined;
  public filtersOpened = false;
  public priceFilter: number | null = null;
  public error = '';

  constructor(
    private productsManagementService: ProductsManagementService,
    private productsFilterService: ProductsFilterService,
    private cd: ChangeDetectorRef
  ) {
    super();
  }

  public ngOnInit(): void {
    this.products$ = this.productsManagementService.getProducts(15).pipe(catchError((err) => {
      this.error = err;
      this.cd.markForCheck();
      return EMPTY;
    }));
  }

  public priceChanged(value: number) {
    this.productsFilterService.actualPrice$.next(value);
  }

  public clearFilters(): void {
    this.priceFilter = null;
    this.productsFilterService.actualPrice$.next(null);
  };
}
