import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent implements OnInit {

  @Input() radioOptions = []; //should be in form of [{value:'abc', displayName: 'ABC Value'}]
  @Input() radioLabel = '' // header for radio values
  @Input() radioValue = null; //default value

  @Output() onChangeRadioButton = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChangeRadio(event) {    
    this.onChangeRadioButton.emit(this.radioValue);
  }

}
