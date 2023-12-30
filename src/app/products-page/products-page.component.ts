import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, OnInit} from '@angular/core';
import {BaseComponent} from "../base/base.component";
import {ProductsManagementService} from "../services/products-management/products-management.service";
import {catchError, EMPTY, Observable, repeat, tap} from "rxjs";
import {ProductType} from "../types/product.type";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {ProductItemComponent} from "../product-item/product-item.component";
import {FormsModule} from "@angular/forms";
import {HighlightDirective} from "../directives/highlight.directive";
import {ProductsFilterService} from "../services/products-filter/products-filter.service";
import {MatButtonModule} from "@angular/material/button";
import {ProductFormComponent} from "../product-form/product-form.component";
import {MatDialog} from "@angular/material/dialog";

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
    NgClass,
    MatButtonModule
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
    public dialog: MatDialog,
    private injector: Injector,
    private cd: ChangeDetectorRef
  ) {
    super();
  }

  public ngOnInit(): void {
    this.products$ = this.productsManagementService.getProducts(15)
      .pipe(
        tap(() => {
          console.log('Fetching products...');
        }),
        repeat({delay: () => this.productsManagementService.productsUpdate$}),
        catchError((err) => {
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

  public openFormDialog(): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      injector: this.injector,
      width: '400px',
      minWidth: '260px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}
