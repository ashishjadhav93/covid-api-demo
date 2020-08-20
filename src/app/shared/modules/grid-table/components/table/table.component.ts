import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { ExcelService } from 'src/app/shared/services/excel.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit {

  @Input() displayedColumns: Object[];
  @Input() tableRows: Object[];
  @Input() excelFileName:string ;

  @Output() tableButtonClickAction = new EventEmitter();
  @Output() tableRowClickAction = new EventEmitter();

  dataSource: MatTableDataSource<any>;
  displayedColumnHeaders: string[] = [];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,  {static: false}) sort: MatSort;

  constructor(
    private excelService:ExcelService
  ) {}

  ngOnInit() {
    this.displayedColumns.forEach((e)=>{
      this.displayedColumnHeaders.push(e['label']);
    });

    this.dataSource = new MatTableDataSource(this.tableRows);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;    
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  tableButtonClickInternal(button,col) {
    this.tableButtonClickAction.emit([button,col]);
  }

  tableRowClickInternal(col) {
    this.tableRowClickAction.emit([col]);
  }

  generateExcel():void {
    this.tableRows.forEach(function(elem) {
      delete elem['partnerId'];
    })
    this.excelService.exportAsExcelFile(this.tableRows,this.excelFileName,null)
  }

  removeSpaces(text){
    return text.replace(/ /, '').toLowerCase();
  }

}
