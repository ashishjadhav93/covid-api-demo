import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {

  @Input() suggestions;
  @Input() value;
  @Input() required;
  @Input() disabled;
  @Input() fieldname;
  @Input() dropdown;
  @Input() placeholder;
  @Input() setValue;
  @Input() fieldLabel:string = '';
  
  @Input() multiple:boolean = false;

  @Output() selectedValue = new EventEmitter();


  constructor() { }

  ngOnInit() {
    if(this.setValue) {
      this.setValue.subscribe(val => {
        this.value = val;
      })
    }
  }

  search(event,suggestions) {
    this.suggestions.copy = this.suggestions.suggestions.filter(e => {
      if(this.fieldname) {
        if(!event.query || (event.query && e[this.fieldname].toLowerCase().includes(event.query.toLowerCase()))) {
          return e
        }
      } else {
        if(!event.query || e.toLowerCase().includes(event.query.toLowerCase())) {
          return e
        }
      }
    });
  }

  clear() {
    this.selectedValue.emit(null);
  }

  emitSelectedValue(value,autoComplete) {    
    this.selectedValue.emit(value);
    if(this.multiple) {
      setTimeout(() => {
        // autoComplete.el.nativeElement.querySelector('input').value = null;
        let input = autoComplete.el.nativeElement.querySelector('input');
        input.value = '';
        input.placeholder = this.placeholder;
        input.blur();
      },1);
    }
  }

  
  onDropdownClick(event,autoComplete) {      
    // console.log(autoComplete)
    if(autoComplete.CUSTOM_SHOW) {
      autoComplete.hide();
      autoComplete.el.nativeElement.querySelector('input').blur();
      autoComplete.CUSTOM_SHOW = false;      
    } else {
      autoComplete.handleDropdownClick();
      autoComplete.CUSTOM_SHOW = true;      
    }
  }

  onBlur(event,autoComplete) {
    setTimeout(()=>{
      autoComplete.CUSTOM_SHOW = false;    
    },500)
  }
}
