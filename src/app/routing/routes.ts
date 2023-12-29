import {Route} from "@angular/router";
import {ProductsPageComponent} from "../products-page/products-page.component";
import {UsersComponent} from "../users/users.component";

export const routes: Route[] = [
  {
    path: '',
    component: ProductsPageComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
