import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-confirmation-popup',
  templateUrl: './custom-confirmation-popup.component.html',
  styleUrls: ['./custom-confirmation-popup.component.scss']
})
export class CustomConfirmationPopupComponent implements OnInit {

  @Input() confirmationPopupContent;

  @Output() actionButtonEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  actionButtonHandler(button) {
    this.actionButtonEvent.emit(button);
  }

}
