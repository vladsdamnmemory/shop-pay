import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ProductType} from "../types/product.type";
import {BaseComponent} from "../base/base.component";
import {TitleCasePipe, UpperCasePipe} from "@angular/common";
import {TruncatePipe} from "../pipes/truncate.pipe";

// Dumb component. Keeping it simple.
@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [
    UpperCasePipe,
    TruncatePipe,
    TitleCasePipe
  ],
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductItemComponent extends BaseComponent {
  @Input() product: ProductType | undefined;
}
