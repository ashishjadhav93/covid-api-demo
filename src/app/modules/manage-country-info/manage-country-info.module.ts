import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {ManageInfoRoutingModule} from   './manage-country-info-routing.module'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ManageCountryInfoComponent } from './components/manage-country-info/manage-country-info.component';
// Import FusionCharts library and chart modules
// import { FusionChartsModule } from "angular-fusioncharts";
// // import {bootstrap} from '../../../../node_modules/bootstrap';
// import * as FusionCharts from "fusioncharts";
// import * as charts from "fusioncharts/fusioncharts.charts";
// import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
// Pass the fusioncharts library and chart modules
// FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);

@NgModule({ 
  imports: [
    CommonModule,
    HttpClientModule,
    ManageInfoRoutingModule,
    FormsModule,
    BrowserModule,  
    //FusionChartsModule,
  ],
  bootstrap: [ManageCountryInfoComponent],
  declarations: [ManageCountryInfoComponent],
  providers: [],
})
export class ManageCountryInfoModule {


 }
