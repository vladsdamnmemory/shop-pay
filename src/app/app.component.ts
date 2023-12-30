import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';
import {HeaderComponent} from "./header/header.component";
import {NotificationsComponent} from "./notifications/notifications.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NgSwitch, NgSwitchDefault, NgSwitchCase, RouterOutlet, HeaderComponent, NotificationsComponent]
})
export class AppComponent {
  title = 'shop';
}
