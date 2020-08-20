import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  @Input() allowedVals = [];
  @Input() checkboxValue; //value has to be in object
  @Input() checkboxLabel;
  @Input() KEYNAME;

  // @Output() fromCustomCheckbox = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

}
