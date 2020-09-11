import { Component, OnInit,Renderer2,ViewChild,ElementRef } from '@angular/core';
import { UrlService } from 'src/app/shared/services/url.service';
import { Title } from '@angular/platform-browser';
import { RouteguardService } from 'src/app/shared/services/routeguard.service';
import { Route } from '@angular/compiler/src/core';
import { AppLevelDataPassService } from 'src/app/shared/services/app-level-data-pass.service';
import { Router, Routes, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {ManageInfoService} from "../../services/manage-info.service";
import { NgIf, JsonPipe } from '@angular/common';
 
 var getAssociatesExtensionsAlldata= {}; 
@Component({
  selector: 'app-manage-info',
  templateUrl: './manage-info.component.html',
  styleUrls: ['./manage-info.component.scss']
})
 
export class ManageInfoComponent implements OnInit {
  
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
 districtData
 goSlideDown= false;
//  totalCountryCount={
//   TotalConfirmed:0,
//   TotalRecovered:0,
//   TotalDeaths:0
//  }
modalObject={
  associatedStateDataTable:false
}
associatedStateCategoryData=[];
  countryNames=[];
  totalCountryCount=[]
  constructor(     
    private urlService: UrlService,
    private titleService: Title,
    private routeService: RouteguardService,
    private router: Router,
    private appService: AppLevelDataPassService,
    private ManageInfoService:ManageInfoService,
    private renderer:Renderer2,
    private route: ActivatedRoute
  ) {}
  getAssociatesExtensionsAlldata={}

  ngOnInit() {
    this.appService.setRouterLoader(false);   
        this.titleService.setTitle('manage-info')         
        this.initFunction();
  }
  
  initFunction(){    
  // this.getManageAccounts(); 
     this.getmanageCountryInfo(this.dropDownvalueSelector.selectedCountry)
     this.getcountryCount();
     this.getStateTableInfo();
     
  }
  getmanageCountryInfo(selectedValue){   
    this.ManageInfoService.getmanageCountrynameInfo().subscribe(val=>{
      if(val['Countries'] instanceof Array) {
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
  getcountryCount(){
    this.ManageInfoService.getTotalCountryCountInfo().subscribe(val=>{       
        Object.keys(val).forEach((objectKey,value) => {         
            this.totalCountryCount[objectKey.match(/[A-Z][a-z]+|[0-9]+/g).join(" ")]=val[objectKey];
        });     
    });    
  }
  stateTableData=[];
  getStateTableInfo(){
    this.ManageInfoService.getStateInfo().subscribe(val=>{
      this.districtData=val
        Object.keys(val).forEach((objectKey,value) => { 
          this.stateTableData.push(            
            [ objectKey,
              val[objectKey].total.confirmed,
              val[objectKey].total.confirmed-val[objectKey].total.recovered,
              val[objectKey].total.recovered,
              val[objectKey].total.deceased,
              val[objectKey].total.tested
            ]            
          );
      });
      this.enter('MH','Maharashtra');
    });  
  }
  districtTableData=[];
  selectedValueTitle;population;  
  deltaValue=[];
  //selected value of state
  selectedStateAttr=[]
  districtDatashow(selectedValue){
    this.selectedStateAttr=[]
    this.districtTableData=[];
    this.selectedValueTitle="";
    this.selectedStateAttr.push(selectedValue)
    this.ManageInfoService.getStateName().subscribe(element=>{ 
      if(element[selectedValue] !== undefined){
        this.selectedValueTitle="Of " + element[selectedValue];
      }
  });
    this.modalObject['associatedStateDataTable'] = true;  
    
    Object.keys(this.districtData).forEach((objectKey,value) => {
      if(objectKey==selectedValue){
        this.population= this.districtData[selectedValue].meta.population
        if(this.districtData[selectedValue].districts !== undefined){
          Object.keys(this.districtData[selectedValue].districts).forEach((objectKey,value) => {  
            this.districtTableData.push(            
              [ objectKey,
                this.districtData[selectedValue].districts[objectKey].total.confirmed,
                this.districtData[selectedValue].districts[objectKey].total.confirmed-(this.districtData[selectedValue].districts[objectKey].total.recovered + this.districtData[selectedValue].districts[objectKey].total.deceased),
                this.districtData[selectedValue].districts[objectKey].total.recovered,
                this.districtData[selectedValue].districts[objectKey].total.deceased,
                this.districtData[selectedValue].districts[objectKey].total.tested
              ]             
            );
          });
        }        
        this.districtTableData.forEach(function(value,index){
          for(var i = 1;i<value.length;i++){
            if(value[i] == undefined || value[i] == " "){
              value[i] = "-";
            }else if( isNaN(value[i])){
              value[i] = 0;
            }
          }
        });
        //delta value
        this.deltaValue=[];
       // console.log(this.districtData[selectedValue].delta);
        if(this.districtData[selectedValue].delta  !== undefined)
        Object.keys(this.districtData[selectedValue].delta).forEach((deltaKeys,index) => { 
          this.deltaValue.push(
            [deltaKeys,this.districtData[selectedValue].delta[deltaKeys]]
          )
        });
      }
    });    
  }
  GoDown(){
    if(this.goSlideDown==true){
      this.goSlideDown=false;
    }else{
      this.goSlideDown=true;
    }
  }
  
  hoverStateSelector={
    confirmedCase:0,
    activeCase:0,
    recoveredCase:0,
    deceasedCase:0,  
    testedcase:0,  
    selectedState:"MH"
 };
  enter(stateattr,value) { 
    //console.log(value);  
    this.hoverStateSelector.selectedState=value; 
    this.stateTableData.forEach(element => {      
    // console.log(element)
      if(element[0]==stateattr){
        this.hoverStateSelector.confirmedCase=element[1];
        this.hoverStateSelector.activeCase=element[2];
        this.hoverStateSelector.recoveredCase=element[3];
        this.hoverStateSelector.deceasedCase=element[4];
        this.hoverStateSelector.testedcase=element[5];
      }     
    });
}
  
  cancelModal() {
    Object.keys(this.modalObject).forEach(elem => {
      this.modalObject[elem] = false;
    });
  }
  onChangeCountryDropDown(selectedValue){
    this.getmanageCountryInfo(selectedValue)
  }
  statedatainfo(){
    this.ManageInfoService.statedatainfo(this.selectedStateAttr);
    this.router.navigateByUrl(`/state-info/${this.selectedStateAttr}`);
  }
}
export interface UserSelectedEventArgs{
  selectedState:string
}


