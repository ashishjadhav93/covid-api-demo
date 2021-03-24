import { Component, OnInit,Renderer2,ViewChild,ElementRef,NgZone } from '@angular/core';
import { UrlService } from 'src/app/shared/services/url.service';

import { Title } from '@angular/platform-browser';
import { RouteguardService } from 'src/app/shared/services/routeguard.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { AppLevelDataPassService } from 'src/app/shared/services/app-level-data-pass.service';
import {ManageCountryInfoService} from '../../services/manage-country-info.service';


// import { FusionChartsModule } from "angular-fusioncharts";
// // Import FusionCharts library and chart modules
// import * as FusionCharts from "fusioncharts";
// import * as charts from "fusioncharts/fusioncharts.charts";
// import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
// // Load Maps
// import * as Maps from 'fusioncharts/fusioncharts.maps';

// // Load WorldMap definition
// import * as worldwithcountries from 'fusioncharts/maps/fusioncharts.worldwithcountries';
// import * as usa from 'fusioncharts/maps/fusioncharts.usa';
// import * as india from 'fusioncharts/maps/';
// FusionChartsModule.fcRoot(FusionCharts, charts,Maps, worldwithcountries,usa,india, FusionTheme);


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
 eventsClick={}
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
    private zone: NgZone,
    // private FusionChartsModule:FusionChartsModule
  ) { }

  ngOnInit() {   
    this. initFunction();       
  }
  initFunction(){   
    this.getmanageCountryInfo(this.dropDownvalueSelector.selectedCountry);  
    this.onloadChart();
    this.getIndiaStateInfo();
  }
  getmanageCountryInfo(selectedValue){   
    this.ManageCountryInfoService.getmanageCountrynameInfo().subscribe(val=>{
      if(val['Countries'] instanceof Array) {
       // console.log(val)
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
  
  type="";
  dataFormat="";
  dataSource;
  chartObj: any;
  nietos = [];
  cass ="low"
    data = {
      chart: {
        caption: "Sales of Cigarettes in Europe",
        subcaption: "(per adult per day)",
        legendposition: "BOTTOM",
        entitytooltext: "$lname: <b>$datavalue </b>",
        legendcaption: "Number of cigarettes smoked per adult per day",
        entityfillhovercolor: "#FFCDD2",
        theme: "",
        numberScaleUnit:"K,M,B",
        numberPrefix:"",
        showLabels:"1"
      },
      // colorrange: {
      //   gradient: "1",
      //   code: "#D5FFF6",
      //   minvalue: "0",
      //   maxvalue: "1500000000",
      //   color: [
      //     {
      //       maxvalue: "50000",
      //       displayvalue: "0-50000",
      //       code: "#C62828",
      //     },
      //     {
      //       maxvalue: "100000",
      //       displayvalue: "50001-100000",
      //       code: "#EF5350"
      //     },
      //     {
      //       maxvalue: "200000",
      //       displayvalue: "100001-200000",
      //       code: "#E53935"
      //     },
      //     {
      //       maxvalue: "300000",
      //       displayvalue: "200001-300000",
      //       code: "#C62828"
      //     }
      //   ]
      // },
      // data: [
      //         // {
      //         //     "id": "HI",
      //         //     "value": "3189"
      //         // },
      //         // {
      //         //     "id": "DC",
      //         //     "value": "2879"
      //         // },
      //         // {
      //         //     "id": "MD",
      //         //     "value": "920"
      //         // },
      //         // {
      //         //     "id": "DE",
      //         //     "value": "4607"
      //         // },
      //         // {
      //         //     "id": "RI",
      //         //     "value": "4890"
      //         // },
      //         // {
      //         //     "id": "WA",
      //         //     "value": "34927"
      //         // },
      //         // {
      //         //     "id": "OR",
      //         //     "value": "65798"
      //         // },
      //         // {
      //         //     "id": "CA",
      //         //     "value": "61861"
      //         // },
      //         // {
      //         //     "id": "AK",
      //         //     "value": "58911"
      //         // },
      //         // {
      //         //     "id": "ID",
      //         //     "value": "42662"
      //         // },
      //         // {
      //         //     "id": "NV",
      //         //     "value": "78041"
      //         // },
      //         // {
      //         //     "id": "AZ",
      //         //     "value": "41558"
      //         // },
      //         // {
      //         //     "id": "MT",
      //         //     "value": "62942"
      //         // },
      //         // {
      //         //     "id": "WY",
      //         //     "value": "78834"
      //         // },
      //         // {
      //         //     "id": "UT",
      //         //     "value": "50512"
      //         // },
      //         // {
      //         //     "id": "CO",
      //         //     "value": "73026"
      //         // },
      //         // {
      //         //     "id": "NM",
      //         //     "value": "78865"
      //         // },
      //         // {
      //         //     "id": "ND",
      //         //     "value": "50554"
      //         // },
      //         // {
      //         //     "id": "SD",
      //         //     "value": "35922"
      //         // },
      //         // {
      //         //     "id": "NE",
      //         //     "value": "43736"
      //         // },
      //         // {
      //         //     "id": "KS",
      //         //     "value": "32681"
      //         // },
      //         // {
      //         //     "id": "OK",
      //         //     "value": "79038"
      //         // },
      //         // {
      //         //     "id": "TX",
      //         //     "value": "75425"
      //         // },
      //         // {
      //         //     "id": "MN",
      //         //     "value": "43485"
      //         // },
      //         // {
      //         //     "id": "IA",
      //         //     "value": "46515"
      //         // },
      //         // {
      //         //     "id": "MO",
      //         //     "value": "63715"
      //         // },
      //         // {
      //         //     "id": "AR",
      //         //     "value": "34497"
      //         // },
      //         // {
      //         //     "id": "LA",
      //         //     "value": "70706"
      //         // },
      //         // {
      //         //     "id": "WI",
      //         //     "value": "42382"
      //         // },
      //         // {
      //         //     "id": "IL",
      //         //     "value": "73202"
      //         // },
      //         // {
      //         //     "id": "KY",
      //         //     "value": "79118"
      //         // },
      //         // {
      //         //     "id": "TN",
      //         //     "value": "44657"
      //         // },
      //         // {
      //         //     "id": "MS",
      //         //     "value": "66205"
      //         // },
      //         // {
      //         //     "id": "AL",
      //         //     "value": "75873"
      //         // },
      //         // {
      //         //     "id": "GA",
      //         //     "value": "76895"
      //         // },
      //         // {
      //         //     "id": "MI",
      //         //     "value": "67695"
      //         // },
      //         // {
      //         //     "id": "IN",
      //         //     "value": "33592"
      //         // },
      //         // {
      //         //     "id": "OH",
      //         //     "value": "32960"
      //         // },
      //         // {
      //         //     "id": "PA",
      //         //     "value": "54346"
      //         // },
      //         // {
      //         //     "id": "NY",
      //         //     "value": "42828"
      //         // },
      //         // {
      //         //     "id": "VT",
      //         //     "value": "77411"
      //         // },
      //         // {
      //         //     "id": "NH",
      //         //     "value": "51403"
      //         // },
      //         // {
      //         //     "id": "ME",
      //         //     "value": "64636"
      //         // },
      //         // {
      //         //     "id": "MA",
      //         //     "value": "51767"
      //         // },
      //         // {
      //         //     "id": "CT",
      //         //     "value": "57353"
      //         // },
      //         // {
      //         //     "id": "NJ",
      //         //     "value": "80788"
      //         // },
      //         // {
      //         //     "id": "WV",
      //         //     "value": "95890"
      //         // },
      //         // {
      //         //     "id": "VA",
      //         //     "value": "83140"
      //         // },
      //         // {
      //         //     "id": "NC",
      //         //     "value": "97344"
      //         // },
      //         // {
      //         //     "id": "SC",
      //         //     "value": "88234"
      //         // },
      //         // {
      //         //     "id": "FL",
      //         //     "value": "88234"
      //         // }

      // ] 
    };
    indexcount="";
    getIndiaStateInfo(){
      // this.ManageCountryInfoService.getStateInfo().subscribe(val=>{
      //   console.log(val);
      //  Object.keys(val).forEach((objectKey,index)=>{
                 
      //    if(index<=8){
      //     this.indexcount="00"+(index+1)
      //    }else{
      //     this.indexcount="0"+(index+1)
      //    }
      //   //  console.log(this.indexcount,objectKey,val[objectKey].total.confirmed) 
      //   //  this.data.data.push({
      //   //     id:objectKey.toString(),
      //   //     value:val[objectKey].total.confirmed,
      //   //     displayvalue:objectKey,
      //   //     fontcolor: "#000000",
      //   //     showlabel: "1",       
      //   //     tooltext:"$lname has "+val[objectKey].total.confirmed
      //   //   });
      //    this.data.data.push({"id":objectKey,  "value": val[objectKey].total.confirmed})
        
      //  });
       
      // });
      this.ManageCountryInfoService.getmanageCountrynameInfo().subscribe(val=>{
        // if(val['Countries'] instanceof Array) {
         
        // }
        console.log(val)
        Object.keys(val).forEach((objectKey,index)=>{         
          val['Countries'].forEach(element => { 
            console.log(element.CountryCode);
          })
        })
      });
     // console.log(this.data.data)
    }
    
  onloadChart(){     
    this.type = "goa";
    this.dataFormat = "json";
    this.dataSource = this.data;
  }
 
  initialized($event) { 
      this.chartObj = $event.chart;
      console.log($event.chart)
  }
}
