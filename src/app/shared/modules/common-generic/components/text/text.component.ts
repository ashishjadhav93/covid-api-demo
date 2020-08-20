import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  @Input() textLabel;
  @Input() placeholder;
  @Input() inputValue;
  @Input() width;
  @Input() isDisabled = 0;

  textValue = '';
  @Output() outputValue = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onInputChange() {
    this.outputValue.emit(this.textValue);
  }

}
