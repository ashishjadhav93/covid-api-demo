import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { PrimeTableComponent } from './components/prime-table.component';
import { MatProgressSpinnerModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip'; 

@NgModule({
  declarations: [
    PrimeTableComponent
  ],
  imports: [
    CommonModule,
    MultiSelectModule,
    TableModule,
    FormsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatTooltipModule
  ],
  exports: [
    PrimeTableComponent
  ]
})
export class PrimeTableModule { }
