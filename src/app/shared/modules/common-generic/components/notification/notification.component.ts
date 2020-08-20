import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor() { }

  @Input() notificationText = '';
  @Input() showNotification:boolean = false;
  @Input() status: boolean;

  @Output() removeNotificationEvent = new EventEmitter();

  ngOnInit() {
  }

  removeNotification() {
    this.showNotification = false;
    this.removeNotificationEvent.emit(true);
  }

}
