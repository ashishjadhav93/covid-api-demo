import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-new-button',
  templateUrl: './add-new-button.component.html',
  styleUrls: ['./add-new-button.component.scss']
})
export class AddNewButtonComponent implements OnInit {

  @Input() buttonText = ''

  @Input() disabled: boolean = false;

  @Output() clickEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClickEvent() {
    this.clickEvent.emit(true);
  }

}
