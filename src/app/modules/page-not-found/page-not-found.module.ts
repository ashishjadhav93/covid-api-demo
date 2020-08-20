import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFoundRoutingModule } from './page-not-found-routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
 
  imports: [
    CommonModule,
    PageNotFoundRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  declarations: [PageNotFoundComponent]
  
})
export class PageNotFoundModule { }
