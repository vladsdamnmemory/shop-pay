import {Inject, Injectable} from '@angular/core';
import {BaseComponent} from "../../base/base.component";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, take, throwError} from "rxjs";
import {ProductType} from "../../types/product.type";

@Injectable()
export class ProductsManagementService extends BaseComponent {

  constructor(@Inject('PRODUCTS_API') private url: string, private http: HttpClient) {
    super();
  }

  public getProducts(amount = 5): Observable<Array<ProductType>> {
    return this.http.get<Array<ProductType>>(`${this.url}/products?limit=${amount}`)
      .pipe(
        take(1),
        catchError((err) => {
          console.log(err);
          // Temporary decision to save time now
          return throwError(() => new Error('Failed to load products. Please refresh the page.'));
        })
      );
  }
}
