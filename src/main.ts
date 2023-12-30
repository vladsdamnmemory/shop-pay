import {importProvidersFrom} from '@angular/core';
import {AppComponent} from './app/app.component';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {provideRouter} from "@angular/router";
import {routes} from "./app/routing/routes";
import {HttpClientModule} from "@angular/common/http";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialog, MatDialogModule} from "@angular/material/dialog";


bootstrapApplication(AppComponent, {
  // Todo: Add configuration variations
  providers: [
    {
      provide: 'PRODUCTS_API',
      useValue: 'https://fakestoreapi.com'
    }, {
      provide: 'jsonplaceholder_API',
      useValue: 'https://jsonplaceholder.typicode.com'
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {hasBackdrop: true}
    },
    provideRouter(routes),
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      MatDialogModule,
      MatDialog
    )]
})
  .catch(err => console.error(err));
