import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NotificationsService} from "../services/notifications/notifications.service";
import {NotificationType} from "../types/notification.type";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {animate, style, transition, trigger} from "@angular/animations";

export const customFadeAnimation = trigger('customFadeAnimation', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateY(-12px)'
    }),
    animate('0.3s ease-out', style({opacity: 1, transform: 'translateY(0)'}))
  ]),
  transition(':leave', [
    style({
      opacity: 1,
      transform: 'translateY(0)'
    }),
    animate('0.3s ease-in', style({opacity: 0}))
  ])
]);

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf,
    NgClass
  ],
  animations: [customFadeAnimation],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsComponent implements OnInit {
  public notes: Array<NotificationType> = [];

  constructor(
    private notificationsService: NotificationsService,
    private cd: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    this.notificationsService.notifications$.subscribe((value) => {
      console.log('Notifications:', value);
      this.notes.push(value);
      this.cd.markForCheck();
      setTimeout(() => {
        this.notes = this.notes.slice(1);
        this.cd.markForCheck();
      }, 5000);
    });
  }
}
