import { Component, OnInit,Renderer2,ViewChild,ElementRef } from '@angular/core';
import { UrlService } from 'src/app/shared/services/url.service';
import { Title } from '@angular/platform-browser';
import { RouteguardService } from 'src/app/shared/services/routeguard.service';
import { Route } from '@angular/compiler/src/core';
import { AppLevelDataPassService } from 'src/app/shared/services/app-level-data-pass.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {ManageInfoService} from "../../services/manage-info.service";
import { NgIf, JsonPipe } from '@angular/common';
import { StateInfoService } from '../../services/state-info.service';
import { element } from 'protractor';
//import { ManageInfoComponent,UserSelectedEventArgs } from '../manage-info/manage-info.component';
@Component({
  selector: 'app-state-info',
  templateUrl: './state-info.component.html',
  styleUrls: ['./state-info.component.scss']
})
export class StateInfoComponent implements OnInit {
 
  selectedstatepage="MH";
  //user:UserSelectedEventArgs;
  constructor(
      private urlService: UrlService,
      private titleService: Title,
      private routeService: RouteguardService,
      private router: Router,
      private route:ActivatedRoute,
      private appService: AppLevelDataPassService,
      private ManageInfoService:ManageInfoService,
      private StateInfoService:StateInfoService,
      private renderer:Renderer2,
  ) {}
  StateSelectors={
    confirmedCase:0,
    activeCase:0,
    recoveredCase:0,
    deceasedCase:0,  
    testedcase:0,  
    selectedState:"MH",
    population:0,
    NewConfirmed:0,
    NewDeaths:0,
    NewRecovered:0,
 };
 stateISDname={  
    "AN":"Andaman and Nicobar Islands",
    "AP":"Andhra Pradesh",
    "AR":"Arunachal Pradesh",
    "AS":"Assam",
    "BR":"Bihar",
    "CT":"Chandigarh",
    "CH":"Chhattisgarh",
    "DN":"Dadra and Nagar Haveli",
    "DD":"Daman and Diu",
    "DL":"Delhi",
    "GA":"Goa",
    "GJ":"Gujarat",
    "HR":"Haryana",
    "HP":"Himachal Pradesh",
    "JK":"Jammu and Kashmir",
    "JH":"Jharkhand",
    "KA":"Karnataka",
    "KL":"Kerala",
    "LA":"Ladakh",
    "LD":"Lakshadweep",
    "MP":"Madhya Pradesh",
    "MH":"Maharashtra",
    "MN":"Manipur",
    "ML":"Meghalaya",
    "MZ":"Mizoram",
    "NL":"Nagaland",
    "OR":"Odisha",
    "PY":"Puducherry",
    "PB":"Punjab",
    "RJ":"Rajasthan",
    "SK":"Sikkim",
    "TN":"Tamil Nadu",
    "TG":"Telangana",
    "TR":"Tripura",
    "UP":"Uttar Pradesh",
    "UT":"Uttarakhand",
    "WB":"West Bengal"
 }
selectedDistrict=[];
mapBlockCall=false
  ngOnInit() {
    this.initFunction();    
    console.log("state info data")
  }
  initFunction(){
    this.titleService.setTitle('state-info')    
    this.getSelectedStatepage();
  } 
  
  getSelectedStatepage(){
    this.selectedstatepage="";
    this.ManageInfoService.$stateDataInfo.subscribe((data)=>{
      if(!data){
        // this.ManageInfoService.getStateName().subscribe(element=>{ 
        //   this.selectedstatepage= element[this.route.snapshot.params.state]
        // });
        this.selectedstatepage=this.stateISDname[this.route.snapshot.params.state]
        console.log(this.route.snapshot.params.state)
      }else{
        // this.ManageInfoService.getStateName().subscribe(element=>{ 
        //   this.selectedstatepage= element[data.selectedState]
        // });    
        this.selectedstatepage=this.stateISDname[data.selectedState]
      }      
    });
    this.ManageInfoService.getStateInfo().subscribe(val=>{
      console.log(val)
      Object.keys(val).forEach((objectKey,value) => {       
        this.StateSelectors.confirmedCase=val[this.route.snapshot.params.state].total.confirmed;
        this.StateSelectors.activeCase=val[this.route.snapshot.params.state].total.confirmed-(val[this.route.snapshot.params.state].total.recovered+ val[this.route.snapshot.params.state].total.deceased);
        this.StateSelectors.recoveredCase=val[this.route.snapshot.params.state].total.recovered;
        this.StateSelectors.deceasedCase=val[this.route.snapshot.params.state].total.deceased;
        this.StateSelectors.testedcase=val[this.route.snapshot.params.state].total.tested;
        this.StateSelectors.population=val[this.route.snapshot.params.state].meta.population;
       if(val[this.route.snapshot.params.state].delta !== undefined){
        if(val[this.route.snapshot.params.state].delta.confirmed !== undefined){
          this.StateSelectors.NewConfirmed=val[this.route.snapshot.params.state].delta.confirmed;  
        }
        if(val[this.route.snapshot.params.state].delta.recovered !== undefined){
          this.StateSelectors.NewRecovered=val[this.route.snapshot.params.state].delta.recovered;  
        } 
        if(val[this.route.snapshot.params.state].delta.deceased !== undefined){
          this.StateSelectors.NewDeaths=val[this.route.snapshot.params.state].delta.deceased;  
        }
       }
        
      });
    });
  }
}

