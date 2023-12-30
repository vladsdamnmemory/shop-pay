import {Inject, Injectable} from '@angular/core';
import {BaseComponent} from "../../base/base.component";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map, Observable, Subject, take, tap, throwError} from "rxjs";
import {AddProductReqBodyType, ProductType} from "../../types/product.type";

@Injectable()
export class ProductsManagementService extends BaseComponent {
  public productsUpdate$: Subject<void> = new Subject<void>();

  // Temporary mock solution to save time
  // Todo: save to local storage
  // Now being kept within service
  private userProducts: Array<ProductType> = [];

  constructor(@Inject('PRODUCTS_API') private url: string, private http: HttpClient) {
    super();
  }

  // Todo: retrieve added by user products from local storage
  public getProducts(amount = 5): Observable<Array<ProductType>> {
    return this.http.get<Array<ProductType>>(`${this.url}/products?limit=${amount}`)
      .pipe(
        take(1),
        map((arr) => arr.concat(this.userProducts) as ProductType[]),
        catchError((err) => {
          console.log(err);
          // Temporary decision to save time now
          return throwError(() => new Error('Failed to load products. Please refresh the page.'));
        })
      );
  }

  // Todo: save added product to local storage
  public addProduct(body: AddProductReqBodyType): Observable<any> {
    // https://fakestoreapi.com/docs !!! Adding to database not available !!!
    // Let's imitate it
    return this.http.post(`${this.url}/products?`, {
      ...body,
      category: 'custom'
    })
      .pipe(
        take(1),
        tap((data: any) => {
          // So fake but definitely temporary (for demo purposes only)
          this.userProducts.push({
            category: body.category,
            description: "",
            id: data['id'],
            image: body.image,
            price: body.price,
            rating: {count: 0, rate: 0},
            title: body.title
          });
        }),
        catchError((err: HttpErrorResponse) => {
          console.log(err);
          // Temporary decision to save time now
          return throwError(() => new Error(`Failed to add new product (${err.status}).`));
        })
      );
  }
}
