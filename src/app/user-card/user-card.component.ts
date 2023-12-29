import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {UserType} from "../types/user.type";
import {BaseComponent} from "../base/base.component";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent extends BaseComponent {
  @Input() user: UserType | undefined;
}
