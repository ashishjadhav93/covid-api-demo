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
 title = 'first-fusioncharts-project';
 mapData={}
 //dataSource: Object;
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
    this. initFunction();       
  }
  initFunction(){   
    this.getmanageCountryInfo(this.dropDownvalueSelector.selectedCountry);  
    this.onloadChart()
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
   width = 450;
   height = 590;
   type = "";
   dataFormat = "json";
   dataSource = this.mapData;
  onloadChart(){   
     this.mapData = { 
      chart:{
        caption:"Worldwide Covid-19 Information",
        subcaption:"",
       // showBorder: "10",
        //canvasTopPadding:"60",
        // borderColor:"#fff",
        captionalignment:"top-center",
        entityfillhovercolor: "#f8e9e9",
        entityFillColor: "#3fc1e2",
        bgColor:"#ffffff",
        //bgImage:'',
        // chartTopMargin:"60"
        // theme: "fusion",
        // formatnumberscale: "0",
      }
     }
    //   chart: {
    //     showlegend: 0,
    //     caption: "Co-working Locations of WeWork in Different Countries",
    //     nullentityfillcolor: "#757DE8",
    //     showmarkerlabels: "0",
    //     showentitytooltip: "0",
    //     showentityhovereffect: "0", 
    //     theme: "fusion"
    //   }
    // };
   // console.log(this.mapData)
    this.width = 950;
    this.height = 590;
    this.type = "maps/worldwithcountries"; 
    this.dataFormat = "json";
    this.dataSource = this.mapData
  }
}
