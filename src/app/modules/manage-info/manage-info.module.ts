import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageInfoRoutingModule } from './manage-info-routing.module';
import { ManageInfoComponent } from './components/manage-info/manage-info.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
 
  imports: [
    CommonModule,
    ManageInfoRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  declarations: [ManageInfoComponent]
  
})
export class ManageInfoModule { }
