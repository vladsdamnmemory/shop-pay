import {Inject, Injectable} from '@angular/core';
import {BaseComponent} from "../../base/base.component";
import {HttpClient} from "@angular/common/http";
import {Observable, take} from "rxjs";
import {UserType} from "../../types/user.type";

@Injectable()
export class MockHttpServiceService extends BaseComponent {

  constructor(
    @Inject('jsonplaceholder_API') private url: string,
    private http: HttpClient
  ) {
    super();

  }

  public getUsers(): Observable<UserType[]> {
    return this.http.get<UserType[]>(`${this.url}/users`).pipe(take(1));
  }

}
