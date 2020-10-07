import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { UrlService } from './shared/services/url.service';
// import { CookieService } from 'ngx-cookie-service';
import { NavbarComponent } from './components/navbar/navbar.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FusionChartsModule } from "angular-fusioncharts";
// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
// Load Maps
import * as Maps from 'fusioncharts/fusioncharts.maps';

// Load WorldMap definition
import * as worldwithcountries from 'fusioncharts/maps/fusioncharts.worldwithcountries';
import * as usa from 'fusioncharts/maps/fusioncharts.usa';
import * as india from 'fusioncharts/maps/fusioncharts.india';
// import * as indiacountrie from 'fusioncharts/maps/fusioncharts.india';

// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(FusionCharts, charts,Maps, worldwithcountries,usa,india, FusionTheme);
// import {MatDatepicker} from '@angular/material/datepicker';
// import {MatInput} from '@angular/material/input';
// import {} from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent ,
    routingComponents,
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    FusionChartsModule
    // MatDatepicker,
    // MatInput

  ],
  // providers:[UrlService,CookieService],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
