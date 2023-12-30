import {Injectable} from '@angular/core';
import {NotificationType} from "../../types/notification.type";
import {Observable, ReplaySubject} from "rxjs";
import {environment} from "../../../config/environments/environment.production";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  public notifications$: Observable<NotificationType>;

  private notification$: ReplaySubject<NotificationType> = new ReplaySubject<NotificationType>(1);

  constructor() {
    this.notifications$ = this.notification$.asObservable();
  }

  public addNotification(notification: NotificationType, prod = true): void {
    // Send s notification depending on provided condition
    // @param prod means should be displayed on production for a user to see. Default true.
    // prod false means messaging developers only
    if (prod || !environment.production) {
      this.notification$.next(notification);
    }
  }
}
