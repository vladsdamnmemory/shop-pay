import {importProvidersFrom} from '@angular/core';
import {AppComponent} from './app/app.component';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {provideRouter} from "@angular/router";
import {routes} from "./app/routing/routes";
import {HttpClientModule} from "@angular/common/http";


bootstrapApplication(AppComponent, {
  // Todo: think about configuration implementation due to environment.ts file
  providers: [
    {
      provide: 'PRODUCTS_API',
      useValue: 'https://fakestoreapi.com'
    }, {
      provide: 'jsonplaceholder_API',
      useValue: 'https://jsonplaceholder.typicode.com'
    },
    provideRouter(routes), importProvidersFrom(BrowserModule, BrowserAnimationsModule, HttpClientModule)]
})
  .catch(err => console.error(err));
