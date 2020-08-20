import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { 
  MatTableModule ,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule
} from '@angular/material';
import { ExcelService } from '../../services/excel.service';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule
  ],
  declarations: [
    TableComponent
  ],
  exports: [
    TableComponent
  ],
  providers: [
    ExcelService
  ]
})
export class GridTableModule { }
