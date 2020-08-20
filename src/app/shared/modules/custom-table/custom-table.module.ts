import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomTableComponent } from './components/custom-table/custom-table.component';
import { FormsModule } from '@angular/forms';
import { ExcelService } from '../../services/excel.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatTooltipModule,
    MultiSelectModule
  ],
  declarations: [CustomTableComponent],
  exports: [
    CustomTableComponent
  ],
  providers: [ExcelService]
})
export class CustomTableModule { }
