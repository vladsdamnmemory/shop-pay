import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {UserCardComponent} from "../user-card/user-card.component";
import {BaseComponent} from "../base/base.component";
import {Observable} from "rxjs";
import {UserType} from "../types/user.type";
import {MockHttpServiceService} from "../services/mock-http-service/mock-http-service.service";
import {AsyncPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    UserCardComponent,
    AsyncPipe,
    NgForOf
  ],
  providers: [MockHttpServiceService],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent extends BaseComponent implements OnInit {
  public users$: Observable<UserType[]> | undefined;

  constructor(private userService: MockHttpServiceService) {
    super();
  }

  public ngOnInit(): void {
    this.users$ = this.userService.getUsers();
  }
}
