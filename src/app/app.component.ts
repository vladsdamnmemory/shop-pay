import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgSwitch, NgSwitchDefault, NgSwitchCase } from '@angular/common';
import {HeaderComponent} from "./header/header.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
  imports: [NgSwitch, NgSwitchDefault, NgSwitchCase, RouterOutlet, HeaderComponent]
})
export class AppComponent {
  title = 'shop';
}
