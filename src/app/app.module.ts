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
// import {MatDatepicker} from '@angular/material/datepicker';
// import {MatInput} from '@angular/material/input';
// import {} from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent ,
    routingComponents   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    // MatDatepicker,
    // MatInput

  ],
  // providers:[UrlService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }