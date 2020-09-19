import { Component, OnInit,Renderer2,ViewChild,ElementRef } from '@angular/core';
import { UrlService } from 'src/app/shared/services/url.service';
import { Title } from '@angular/platform-browser';
import { RouteguardService } from 'src/app/shared/services/routeguard.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { AppLevelDataPassService } from 'src/app/shared/services/app-level-data-pass.service';
import {ManageCountryInfoService} from '../../services/manage-country-info.service'
@Component({
  selector: 'app-manage-country-info',
  templateUrl: './manage-country-info.component.html',
  styleUrls: ['./manage-country-info.component.scss']
})
export class ManageCountryInfoComponent implements OnInit {
  dropDownvalueSelector={
    confirmedCase:0,
    activeCase:0,
    recoveredCase:0,
    deceasedCase:0,
    NewConfirmed:0,
    NewDeaths:0,
    NewRecovered:0,
    countrySelector:"",
    selectedCountry:"India"
 }; 
 countryNames=[];
  constructor(
    private urlService: UrlService,
    private titleService: Title,
    private routeService: RouteguardService,
    private ManageCountryInfoService:ManageCountryInfoService,
    private router: Router,
    private appService: AppLevelDataPassService,
    private renderer:Renderer2,
  ) { }

  ngOnInit() {
    this. initFunction()
  }
  initFunction(){   
    this.getmanageCountryInfo(this.dropDownvalueSelector.selectedCountry)
  }
  getmanageCountryInfo(selectedValue){   
    this.ManageCountryInfoService.getmanageCountrynameInfo().subscribe(val=>{
      if(val['Countries'] instanceof Array) {
        console.log(val)
        val['Countries'].forEach(element => {
          this.countryNames.push(element.Country)        
          if(element.Country==selectedValue){
            this.dropDownvalueSelector.confirmedCase=element.TotalConfirmed;
            this.dropDownvalueSelector.NewConfirmed=element.NewConfirmed;          
            this.dropDownvalueSelector.recoveredCase=element.TotalRecovered;
            this.dropDownvalueSelector.NewRecovered=element.NewRecovered;
            this.dropDownvalueSelector.deceasedCase=element.TotalDeaths; 
            this.dropDownvalueSelector.NewDeaths=element.NewDeaths;
            this.dropDownvalueSelector.activeCase= this.dropDownvalueSelector.confirmedCase-this.dropDownvalueSelector.recoveredCase;
          }
        });
      }
    });
  }
  onChangeCountryDropDown(selectedValue){
    this.getmanageCountryInfo(selectedValue)
  }
}
