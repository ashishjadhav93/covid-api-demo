import { Component, OnInit,Renderer2,ViewChild,ElementRef,Directive } from '@angular/core';
import {ManageInfoService} from "../../../services/manage-info.service";
import { Route } from '@angular/compiler/src/core';
import { RouteguardService } from 'src/app/shared/services/routeguard.service';
import { AppLevelDataPassService } from 'src/app/shared/services/app-level-data-pass.service';
import { StateMapService } from '../../../services/state-map.service';
import { Router, ActivatedRoute } from '@angular/router';
import { strict } from 'assert';
import { stringify } from 'querystring';

@Component({
  selector: 'app-state-map',
  templateUrl: './state-map.component.html',
  styleUrls: ['./state-map.component.scss']
})
// @Directive({
//   selector: '[ngInit]'
// })
export class StateMapComponent implements OnInit {
  //global variable 
  dropDownvalueSelector={
    confirmedCase:0,
    activeCase:0,
    recoveredCase:0,
    deceasedCase:0,
    NewConfirmed:0,
    NewDeaths:0,
    NewRecovered:0,
    selectedCountry:"India"
  };
  showDistrictsData={
    confirmedCase:0,
    activeCase:0,
    recoveredCase:0,
    deceasedCase:0,
    NewConfirmed:0,
    NewDeaths:0,
    NewRecovered:0,
  }
  selectedstatemapName
  selectedDistrict=[];
  selectedstatepage;
  countryNames=[];
  totalCountryCount=[];
  selectedDistrictpage;
  constructor(
    private ManageInfoService:ManageInfoService,
    private routeService: RouteguardService,
    private router: Router,
    private route:ActivatedRoute,
    private StateMapService:StateMapService,
    private renderer:Renderer2,
  ) {}
  ngOnInit() {
    this.initFunction();  
  } 

  initFunction(){
    this.getMapLoad(); 
   this.getmanageCountryInfo(this.dropDownvalueSelector.selectedCountry);
   this.getcountryCount();
  }

  //show map 
  getMapLoad(){   
    this.selectedstatemapName="";
    this.ManageInfoService.$stateDataInfo.subscribe((data)=>{
      if(!data){         
        this.selectedstatemapName= this.route.snapshot.params.state;        
      }else{   
        this.selectedstatemapName= data.selectedState; 
      }
      console.log("true  1")
    }); 
  }

  //World wide cases
  getcountryCount(){
    this.ManageInfoService.getTotalCountryCountInfo().subscribe(val=>{       
        Object.keys(val).forEach((objectKey,value) => {     
            this.totalCountryCount[objectKey.match(/[A-Z][a-z]+|[0-9]+/g).join(" ")]=val[objectKey];
        });     
    });    
  }

  // Country Info cases
  getmanageCountryInfo(selectedValue){
    this.ManageInfoService.getmanageCountrynameInfo().subscribe(val=>{      
      if(val['Countries'] instanceof Array) {
        val['Countries'].forEach(element => {
          this.countryNames.push(element.Country);        
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

 // on map load show first child of districts
  ngAfterViewInit(){
    setTimeout(() => {
      try{
        this.onMapHover(document.querySelector('.stateMapChart').children[0].children[0].children[0].children[0].innerHTML);  
      }catch(e){
        console.log(e)
      }
     }, 0);
  }

  // on map honer 
  onMapHover(value){   
   if(!value.target){
    this.selectedDistrictpage=value;
   }else{    
    this.selectedDistrictpage=value.target.children[0].innerHTML;
   } 
   this.showDistrictsData.confirmedCase=0;
   this.showDistrictsData.activeCase=0;
   this.showDistrictsData.recoveredCase=0;
   this.showDistrictsData.deceasedCase=0;
   this.showDistrictsData.NewConfirmed=0, 
   this.showDistrictsData.NewRecovered=0,
   this.showDistrictsData.NewDeaths=0;
    this.ManageInfoService.getStateInfo().subscribe(val=>{     
        if(val[this.route.snapshot.params.state].districts.hasOwnProperty(this.selectedDistrictpage)){                
          this.showDistrictsData.confirmedCase=val[this.route.snapshot.params.state].districts[this.selectedDistrictpage].total.confirmed;
          this.showDistrictsData.recoveredCase=val[this.route.snapshot.params.state].districts[this.selectedDistrictpage].total.recovered;
          if(val[this.route.snapshot.params.state].districts[this.selectedDistrictpage].total.hasOwnProperty("deceased")){
            this.showDistrictsData.deceasedCase=val[this.route.snapshot.params.state].districts[this.selectedDistrictpage].total.deceased;
          }
          this.showDistrictsData.activeCase=this.showDistrictsData.confirmedCase-(this.showDistrictsData.recoveredCase+this.showDistrictsData.deceasedCase)
            if(val[this.route.snapshot.params.state].districts[this.selectedDistrictpage].delta !== undefined){
            if(val[this.route.snapshot.params.state].districts[this.selectedDistrictpage].delta.confirmed !== undefined){
                  this.showDistrictsData.NewConfirmed=val[this.route.snapshot.params.state].districts[this.selectedDistrictpage].delta.confirmed;  
                }            
                if(val[this.route.snapshot.params.state].districts[this.selectedDistrictpage].delta.recovered !== undefined){
                  this.showDistrictsData.NewRecovered=val[this.route.snapshot.params.state].districts[this.selectedDistrictpage].delta.recovered;  
                } 
                if(val[this.route.snapshot.params.state].districts[this.selectedDistrictpage].delta.deceased !== undefined){
                  this.showDistrictsData.NewDeaths=val[this.route.snapshot.params.state].districts[this.selectedDistrictpage].delta.deceased;  
                }
            }
        }  
    });   
  }
  
  
}

