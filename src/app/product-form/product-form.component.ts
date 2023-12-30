import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, signal, SkipSelf} from '@angular/core';
import {BaseComponent} from "../base/base.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {ProductsManagementService} from "../services/products-management/products-management.service";
import {NgIf} from "@angular/common";
import {NotificationsService} from "../services/notifications/notifications.service";
import {catchError, EMPTY} from "rxjs";

type NewProductFormType = {
  name: FormControl<string>;
  price: FormControl<number>;
  image: FormControl<string | ArrayBuffer | null>;
}

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormComponent extends BaseComponent implements OnInit {
  public formGroup = new FormGroup<NewProductFormType>(<NewProductFormType>{
    name: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.required),
    image: new FormControl(null, Validators.required)
  });

  public loadingData = signal(false);

  constructor(
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @SkipSelf() private productsManagementService: ProductsManagementService,
    private notificationsService: NotificationsService,
    private cd: ChangeDetectorRef
  ) {
    super();
  }

  public ngOnInit(): void {
    this.formGroup.controls.image.valueChanges.subscribe(console.log)
  }

  public submit(): void {
    if (this.formGroup.valid) {
      this.loadingData.set(true);
      // Adding product through POST request
      this.productsManagementService.addProduct({
        title: this.formGroup.value.name as string,
        price: this.formGroup.value.price as number,
        image: this.formGroup.value.image as ArrayBuffer,
        description: '',
        category: ''
      })
        .pipe(
          catchError((err: string) => {
            this.loadingData.set(false);
            this.dialogRef.close(err);
            this.notificationsService.addNotification({
              message: err,
              type: 'error'
            });
            return EMPTY;
          }))
        .subscribe((data) => {
          this.loadingData.set(false);
          this.dialogRef.close(data);
          console.log(data);
          this.productsManagementService.productsUpdate$.next();

          this.notificationsService.addNotification({
            message: 'Product added',
            type: 'success'
          });
        })
    }
  }

  public onFileChange(e: Event) {
    console.log(e);
    const files = (e.target as HTMLInputElement).files;

    if (files?.length) {
      const reader = new FileReader();

      reader.readAsDataURL(files[0]);

      reader.onload = () => {
        this.formGroup.patchValue({
          image: reader.result
        });

        // Need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  public isLoading() {
    return this.loadingData();
  }
}
