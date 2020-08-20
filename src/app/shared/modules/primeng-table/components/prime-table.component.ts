import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { HttpClient } from '@angular/common/http';
import { URLS } from 'src/environments/configURL';

const exclamationRed = `<img src="../../../../../assets/images/exclamationRed.svg" width="14px">`;
const greenTick = `<img src="../../../../../assets/images/greenTick2.svg" width="14px">`;

@Component({
  selector: 'app-prime-table',
  templateUrl: './prime-table.component.html',
  styleUrls: ['./prime-table.component.scss']
})
export class PrimeTableComponent implements OnInit {

  @Input() headerColumns = [];
  @Input() tableRowData = [];
  @Input() selectedColumns = [];
  @Input() excelFileName = '';
  @Input() hasRowClick: boolean = false;

  @Output() rowClickEvent = new EventEmitter();
  @Output() inlineButtonClickEvent = new EventEmitter();
  @Output() hoverButtonClickEvent = new EventEmitter();
  @Output() onhoverTextClickEvent = new EventEmitter();
  @Output() onviewButtonClickEvent = new EventEmitter();
  @Output() onmailBoxButtonClickEvent=new EventEmitter();
 

  tableRowDataCopy = [];

  showEntriesCount = 10;

  constructor(
    private excelService:ExcelService,
    private http: HttpClient
    ) { }

  ngOnInit() {
    this.tableRowDataCopy = this.tableRowData;
    this.headerColumns.forEach(elem => {
      !elem.isHidden ? this.selectedColumns.push(elem) : null;    
    });    
  }

  exportAsExcel() {
    let headerCols = [];
    this.headerColumns.forEach(elem => {
      headerCols.push(elem.keyName)
    })
    this.excelService.exportAsExcelFile(this.tableRowData,this.excelFileName,headerCols);
  }

  filterTable(value) {
    if(value) {
      this.tableRowDataCopy = this.tableRowData.filter(elem => {
        let flag = false;
        Object.keys(elem).forEach(key => {
          if(elem[key] && value && typeof(elem[key]) == 'string' && elem[key].toLowerCase().includes(value.toLowerCase())) {
            flag = true;
          }
        })
        if(flag) return elem;
        else return null;
      })
    } else {
      this.tableRowDataCopy = [...this.tableRowData];
    }
  }

  onRowClick(rowData) {
    if(this.hasRowClick) {
      this.rowClickEvent.emit(rowData);
    }
  }

  onInlineButtonClick(col,rowData) {
    console.log(rowData);
    this.inlineButtonClickEvent.emit([col,rowData]);
  }

  onHoverButtonClick(rowData) {
    this.hoverButtonClickEvent.emit(rowData);
  }
  onviewButtonClick(rowData) {    
    this.onviewButtonClickEvent.emit(rowData);
  }
  onmailBoxButtonClick(rowData) {    
    this.onmailBoxButtonClickEvent.emit(rowData);  
  }
  onhoverTextClick(rowData) {    
    this.onhoverTextClickEvent.emit(rowData);
  }
  onAPIButtonClick(col,reference,cellLoader,responseRef,rowData) {    
    cellLoader.style.display = 'flex';
    reference.style.display = 'none';
    let func = col['inlineAPIButton']['functionName'];
    this[func](reference,cellLoader,responseRef,rowData)
  }

  checkProxyAPICall(reference,cellLoader,responseRef,rowData) {    
    this.http.get(URLS.manageProxy.checkStatus + rowData.proxy).subscribe(val => {
      if(val) {
        responseRef.innerHTML = `${greenTick} &nbsp; Active`;
        responseRef.classList.add('validResponse');
        rowData.proxyStatus = 'Active';
        rowData.className = "validResponse"
      } else {
        responseRef.innerHTML = `${exclamationRed} &nbsp; Invalid/Expired`;
        responseRef.classList.add('invalidResponse');
        rowData.proxyStatus = 'Invalid/Expired';
        rowData.className = "invalidResponse"
      }
      cellLoader.style.display = 'none';

    })
  }

}
