import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { UrlService } from 'src/app/shared/services/url.service';
import { Title } from '@angular/platform-browser';
import { RouteguardService } from 'src/app/shared/services/routeguard.service';
import { Route } from '@angular/compiler/src/core';
import { AppLevelDataPassService } from 'src/app/shared/services/app-level-data-pass.service';
// import { DatePickerModel } from '@syncfusion/ej2-calendars';
import { Router, Routes, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ManageInfoService } from "../../services/manage-info.service";
import { NgIf, JsonPipe } from '@angular/common';

var getAssociatesExtensionsAlldata = {};
@Component({
  selector: 'app-manage-info',
  templateUrl: './manage-info.component.html',
  styleUrls: ['./manage-info.component.scss']
})

export class ManageInfoComponent implements OnInit {

  //  dropDownvalueSelector={
  //     confirmedCase:0,
  //     activeCase:0,
  //     recoveredCase:0,
  //     deceasedCase:0,
  //     NewConfirmed:0,
  //     NewDeaths:0,
  //     NewRecovered:0,
  //     countrySelector:"",
  //     selectedCountry:"India"
  //  }; 
  stateISDname = {
    "AN": "Andaman and Nicobar Islands",
    "AP": "Andhra Pradesh",
    "AR": "Arunachal Pradesh",
    "AS": "Assam",
    "BR": "Bihar",
    "CH": "Chandigarh",
    "CT": "Chhattisgarh",
    "DN": "Dadra and Nagar Haveli",
    "DD": "Daman and Diu",
    "DL": "Delhi",
    "GA": "Goa",
    "GJ": "Gujarat",
    "HR": "Haryana",
    "HP": "Himachal Pradesh",
    "JK": "Jammu and Kashmir",
    "JH": "Jharkhand",
    "KA": "Karnataka",
    "KL": "Kerala",
    "LA": "Ladakh",
    "LD": "Lakshadweep",
    "MP": "Madhya Pradesh",
    "MH": "Maharashtra",
    "MN": "Manipur",
    "ML": "Meghalaya",
    "MZ": "Mizoram",
    "NL": "Nagaland",
    "OR": "Odisha",
    "PY": "Puducherry",
    "PB": "Punjab",
    "RJ": "Rajasthan",
    "SK": "Sikkim",
    "TN": "Tamil Nadu",
    "TG": "Telangana",
    "TR": "Tripura",
    "UP": "Uttar Pradesh",
    "UT": "Uttarakhand",
    "WB": "West Bengal",
    "TT": "thiruvananthapuram"
  }
  districtData;
  updatelognews = []
  goSlideDown = false;
  toggle
  //  totalCountryCount={
  //   TotalConfirmed:0,
  //   TotalRecovered:0,
  //   TotalDeaths:0
  //  }
  modalObject = {
    associatedStateDataTable: false
  }
  associatedStateCategoryData = [];
  countryNames = [];
  totalCountryCount = []
  constructor(
    private urlService: UrlService,
    private titleService: Title,
    private routeService: RouteguardService,
    private router: Router,
    private appService: AppLevelDataPassService,
    private ManageInfoService: ManageInfoService,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    // private DatePickerModel:DatePickerModel
  ) { }
  getAssociatesExtensionsAlldata = {}

  ngOnInit() {
    this.appService.setRouterLoader(false);
    this.titleService.setTitle('manage-info')
    this.initFunction();
  }

  initFunction() {
    // this.getManageAccounts(); 
    // this.getmanageCountryInfo(this.dropDownvalueSelector.selectedCountry)
    this.Loginfo();
    this.getStateTableInfo();
    //this.onloadAnimMap();   
    // this.getmanageCalendarDate("2020-09-17");  
  }
  // getmanageCountryInfo(selectedValue){   
  //   this.ManageInfoService.getmanageCountrynameInfo().subscribe(val=>{
  //     if(val['Countries'] instanceof Array) {
  //       val['Countries'].forEach(element => {
  //         this.countryNames.push(element.Country)        
  //         if(element.Country==selectedValue){
  //           this.dropDownvalueSelector.confirmedCase=element.TotalConfirmed;
  //           this.dropDownvalueSelector.NewConfirmed=element.NewConfirmed;          
  //           this.dropDownvalueSelector.recoveredCase=element.TotalRecovered;
  //           this.dropDownvalueSelector.NewRecovered=element.NewRecovered;
  //           this.dropDownvalueSelector.deceasedCase=element.TotalDeaths; 
  //           this.dropDownvalueSelector.NewDeaths=element.NewDeaths;
  //           this.dropDownvalueSelector.activeCase= this.dropDownvalueSelector.confirmedCase-this.dropDownvalueSelector.recoveredCase;
  //         }
  //       });
  //     }
  //   });
  // }
  Loginfo() {
    this.ManageInfoService.getLogInfo().subscribe(val => {
      Object.keys(val).forEach((objectKey, value) => {
        // var splitted = str.replace(',', '<br/>')
        //console.log(val[objectKey])
        this.updatelognews.push(val[objectKey].update.replace(',', '\n'));
        //console.log(val[objectKey].update.split(','))
        //this.updatelognews.push("1282 new cases /n 1418 recoveries and 9 deaths in Madhya Pradesh")

      });
    });
  }
  stateTableData = [];
  getStateTableInfo() {
    this.ManageInfoService.getStateInfo().subscribe(val => {
      //console.log(val)
      this.districtData = val
      Object.keys(val).forEach((objectKey, value) => {
        console.log(val[objectKey])
        this.stateTableData.push(
          [objectKey,
            val[objectKey].total.confirmed.toLocaleString('en-GB'),
            (val[objectKey].total.confirmed - val[objectKey].total.recovered).toLocaleString('en-GB'),
            val[objectKey].total.recovered.toLocaleString('en-GB'),
            val[objectKey].total.deceased.toLocaleString('en-GB'),
            val[objectKey].total.tested.toLocaleString('en-GB'),
            val[objectKey].total.vaccinated1.toLocaleString('en-GB')
          ]
        );
      });
      this.enter('MH', 'Maharashtra');

    });
  }


  // getmanageCalendarDate(date){
  //   console.log(date);

  //   //this.ManageAccountsService.getAccountHistory(this.addEditManageAccount.id).subscribe(val => {  
  //     this.ManageInfoService.getmanageCalendarViceData(date).subscribe(val=>{
  //       console.log(val);
  //     });
  // }
  districtTableData = [];
  selectedValueTitle; population;
  deltaValue = [];
  //selected value of state
  selectedStateAttr = [];
  districtDatashow(selectedValue) {
    this.selectedStateAttr = []
    this.districtTableData = [];
    this.selectedValueTitle = "";
    this.selectedStateAttr.push(selectedValue)
    this.selectedValueTitle = "Of " + this.stateISDname[selectedValue];
    // console.log(selectedValue)
    this.modalObject['associatedStateDataTable'] = true;

    Object.keys(this.districtData).forEach((objectKey, value) => {
      if (objectKey == selectedValue) {
        this.population = this.districtData[selectedValue].meta.population
        if (this.districtData[selectedValue].districts !== undefined) {
          Object.keys(this.districtData[selectedValue].districts).forEach((objectKey, value) => {
            this.districtTableData.push(
              [objectKey,
                this.districtData[selectedValue].districts[objectKey].total.confirmed,
                this.districtData[selectedValue].districts[objectKey].total.confirmed - (this.districtData[selectedValue].districts[objectKey].total.recovered + this.districtData[selectedValue].districts[objectKey].total.deceased),
                this.districtData[selectedValue].districts[objectKey].total.recovered,
                this.districtData[selectedValue].districts[objectKey].total.deceased,
                this.districtData[selectedValue].districts[objectKey].total.tested,
                this.districtData[selectedValue].districts[objectKey].total.vaccinated1,
              ]
            );
          });
        }
        this.districtTableData.forEach(function (value, index) {
          for (var i = 1; i < value.length; i++) {
            if (value[i] == undefined || value[i] == " ") {
              value[i] = "-";
            } else if (isNaN(value[i])) {
              value[i] = 0;
            }
          }
        });
        this.deltaValue = [];
        if (this.districtData[selectedValue].delta !== undefined)
          Object.keys(this.districtData[selectedValue].delta).forEach((deltaKeys, index) => {
            this.deltaValue.push(
              [deltaKeys, this.districtData[selectedValue].delta[deltaKeys]]
            )
          });
      }
    });
  }
  GoDown() {
    if (this.goSlideDown == true) {
      this.goSlideDown = false;
    } else {
      this.goSlideDown = true;
    }
  }
  maploadtimer
  hoverStateSelector = {
    confirmedCase: 0,
    activeCase: 0,
    recoveredCase: 0,
    deceasedCase: 0,
    testedcase: 0,
    vaccinatcase: 0,
    selectedState: "MH"
  };
  enter(stateattr, value) {
    this.hoverStateSelector.selectedState = value;
    this.stateTableData.forEach(element => {
      if (element[0] == stateattr) {
        this.hoverStateSelector.confirmedCase = element[1];
        this.hoverStateSelector.activeCase = element[2];
        this.hoverStateSelector.recoveredCase = element[3];
        this.hoverStateSelector.deceasedCase = element[4];
        this.hoverStateSelector.testedcase = element[5];
        this.hoverStateSelector.vaccinatcase = element[6];
      }
    });
    // if(document.querySelectorAll(".fillcolor").length >0){
    //   document.querySelector(".fillcolor").classList.remove("fillcolor");
    // }    
    if (document.querySelectorAll(".cf").length > 0) {
      document.querySelector(".cf").classList.remove("cf");
    }
    if (document.querySelectorAll("#" + stateattr).length > 0) {
      document.querySelector("#" + stateattr).classList.add("cf");
    }
  }
  state_name
  tablerowHower(hoverValue) {

    if (document.querySelectorAll(".fillcolor").length > 0) {
      document.querySelector(".fillcolor").classList.remove("fillcolor");
    }
    if (document.querySelectorAll("#IN-" + hoverValue).length > 0) {
      document.getElementById("IN-" + hoverValue).classList.add("fillcolor");
      this.state_name = document.getElementById("IN-" + hoverValue).getAttribute("title")
    }
    this.enter(hoverValue, this.state_name)
  }
  cancelModal() {
    Object.keys(this.modalObject).forEach(elem => {
      this.modalObject[elem] = false;
    });
  }
  // onChangeCountryDropDown(selectedValue){
  //   this.getmanageCountryInfo(selectedValue)
  // }
  statedatainfo() {
    this.ManageInfoService.statedatainfo(this.selectedStateAttr);
    this.router.navigateByUrl(`/state-info/${this.selectedStateAttr}`);
  }
}
export interface UserSelectedEventArgs {
  selectedState: string
}


