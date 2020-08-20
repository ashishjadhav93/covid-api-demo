import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { DataPassingService } from 'src/app/modules/linkgen/services/data-passing.service';
import { AppLevelDataPassService } from 'src/app/shared/services/app-level-data-pass.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {

  @Input() headerText;
  @Input() headerButtons:any[];
  @Input() hideButtons:any[];
  @Input() hasSearchOption:boolean = false;
  @Input() headerSubDetails;
  @Input() searchDropDownValues ;
  @Input() hasPageSearchText:boolean;
  @Input() pageSearchTextPlaceholder:string = '';
  @Input() pageSearchText:string = '';

  searchDropDownValuesCopy;
  showClearAutocompleteButton:boolean = false;
  partnerName = null;

  @Output() headerButtonClickEvent = new EventEmitter();
  @Output() pageSearchEvent = new EventEmitter();

  filterDropDownValues: string = ''

  constructor(
    private dataPassService: DataPassingService,
    private appLevelService: AppLevelDataPassService
  ) { }

  ngOnInit() {
    this.appLevelService.getPartnerName().subscribe(val => {
      this.partnerName = val;
    })
  }

  ngOnChanges() {
    this.searchDropDownValuesCopy = this.searchDropDownValues;    
  }

  checkValue(autoComplete) {
    autoComplete.el.nativeElement.querySelector('input').value ? this.showClearAutocompleteButton = true : this.showClearAutocompleteButton = false;
  }

  searchFieldInForm(value,autoComplete) {    
    if(value) {
      this.showClearAutocompleteButton = true;
      autoComplete.el.nativeElement.querySelector('input').classList.add('white-bg');
      this.dataPassService.setFieldSearch(value.searchLabels);    
      setTimeout(() => {
        autoComplete.el.nativeElement.querySelector('input').blur();        
      }, 10);
    } else {
      this.showClearAutocompleteButton = false;
    }
  }

  clearAutocomplete(autoComplete) {
    console.log(autoComplete);
    this.showClearAutocompleteButton = false;
    autoComplete.el.nativeElement.querySelector('input').value = null;
    autoComplete.el.nativeElement.querySelector('input').classList.remove('white-bg');
  }

  search(event,label) {
    this.searchDropDownValuesCopy = this.searchDropDownValues.filter(e => {
      if(!event.query || e[label].toLowerCase().includes(event.query.toLowerCase())) {
        return e;
      }
    })
  }

  onChangeSearchText() {
    // console.log(this.pageSearchText);
    this.pageSearchEvent.emit(this.pageSearchText);
  }

}
