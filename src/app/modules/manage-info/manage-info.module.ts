import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageInfoRoutingModule } from './manage-info-routing.module';
import { ManageInfoComponent } from './components/manage-info/manage-info.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StateInfoComponent } from './components/state-info/state-info.component';
import { StateMapComponent } from './components/state-info/state-map/state-map.component';


@NgModule({
  imports: [
    CommonModule,
    ManageInfoRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  declarations: [ManageInfoComponent, StateInfoComponent, StateMapComponent]
  
})
export class ManageInfoModule { }
