import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { Title } from '@angular/platform-browser';
import { CustomTableService } from '../../services/custom-table.service';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent implements OnInit {

  @Input() displayedColumns;
  @Input() tableRows;
  @Input() excelFileName;
  @Input() columnWidth;
  @Input() hasRowClick: boolean = false;
  @Input() excelData;
  @Input() showColList = []; 

  @Output() fromCustomTableButtonClickEvent = new EventEmitter();
  @Output() fromCustomTableButtonInlineButtonEvent = new EventEmitter();
  @Output() fromCustomTableRowClickEvent = new EventEmitter();

  tableRowsCopy;
  nowShowTable: boolean = false;

  tableFilterText:string = '';
  obj = Object;
  parseint = parseInt;

  showEntriesCount = 10;
  currentPage = 1;
  totalPages:number  = 0;
  searchReference = 10;
  hoverIndex = -1;
  excelHeaders = [];

  columsList = [];
  displayedColumnsLength = 0;


  constructor(
    private excelService: ExcelService,
    private customTableService: CustomTableService
  ) { 
  }

  ngOnInit() {  
    // console.log(this.displayedColumns);
    let showAllColFlag = true;
    if(this.showColList && this.showColList.length) {
      showAllColFlag = false;
    }
    if(this.displayedColumns instanceof Array) {
      this.displayedColumns.forEach(elem => {        
        if(elem.keyName.toLowerCase().indexOf('partner') == -1) {
          let obj = {}
          obj['label'] = elem.label; 
          obj['value'] = elem.keyName; 
          this.columsList.push(obj);
          showAllColFlag && !elem.isHidden ? this.showColList.push(obj) : null;
          this.excelHeaders.push(elem.keyName);
        }
      })      
    }
    this.hideColumns();
  }

  hideColumns() {
    // console.log(this.showColList)
    this.displayedColumns.forEach(col => {
        let flag = false;
        this.showColList.every(elem => {
          if(elem.label == col.label) {
            flag = true;
          }
          return true;
        })
        if(flag) {
          col.isHidden = false;
        } else {
          col.isHidden = true;
        }
    });
    this.reCalculateWidth();
    this.nowShowTable = true;
  }
  reCalculateWidth() {
    let count = 0;
    this.displayedColumns.forEach(element => {
      if(!element.isHidden) count+= 1;      
    });
    this.displayedColumnsLength = count;
  }

  ngOnChanges() {
    this.tableRowsCopy = this.tableRows;
    this.checkTotalPages();
  }

  checkTotalPages() {
    let length = this.tableRows.length;
    let remainder = length%this.showEntriesCount;
    if(remainder == 0) {
      this.totalPages = length/this.showEntriesCount
    } else {
      this.totalPages = (length-remainder)/this.showEntriesCount + 1;
    }    
  }

  getWidth(length,index,tableReference) {
    if(this.columnWidth) {
      return this.columnWidth[index];
    }
    let width = tableReference.offsetWidth;
    return width/length + 'px';
  }

  filterTable() {
    this.currentPage = 1;
    
    this.tableRows = this.tableRowsCopy.filter(element => {
      let flag = false;
      if(element instanceof Object) {
        // console.log(element)
        Object.keys(element).forEach(key => {
          if(typeof(element[key]) == 'string' && typeof(this.tableFilterText) == 'string' && element[key].toLowerCase().indexOf(this.tableFilterText.toLowerCase()) != -1) {
            flag = true;
          }
        });
      }
      if(flag) {
        return element;
      }
    });
    this.checkTotalPages();
  }

  changePage(pageNumber) {
    this.currentPage = pageNumber;    
  }

  showEntriesChange(value) {
    this.currentPage = 1;
    if(value == 'all') {
      value = this.tableRowsCopy.length;
      this.totalPages = 1;
    }
    this.showEntriesCount = value;
    this.checkTotalPages();    
  }

  generateExcel():void {
    let data = null;
    if(this.excelData) {
      this.excelData.forEach(function(elem) {
        delete elem['partnerId'];
      })
      data = this.excelData;      
    } else {
      this.tableRows.forEach(function(elem) {
        delete elem['partnerId'];
      })
      data = this.tableRows
    }
    this.excelService.exportAsExcelFile(data,this.excelFileName,this.excelHeaders)
  }

  handleCellButtonClick(buttonObject,column) {
    this.fromCustomTableButtonClickEvent.emit([buttonObject,column]);
  }

  // order: column, rows
  handleInlineButtonClick(column,rows) {
    this.fromCustomTableButtonInlineButtonEvent.emit([column,rows]);
  }

  inlineButtonClick(rowIndex,colIndex,rows,rowObject,reference) {
    console.log(reference);
    reference.innerHTML = 'Loading...'
    reference.classList.add('afterAPIButtonClick')
    if(rowObject && rowObject['inlineAPIButton']['functionName']) {
      this[rowObject['inlineAPIButton']['functionName']](rowIndex,colIndex,rows,reference);
    }
    console.log(rowIndex,colIndex);

  }

  handleManageProxyPageProxyStatus(rowIndex,colIndex,rows,ref) {
    let proxy = rows.proxy;
    this.customTableService.manageProxyCheckStatus(proxy).subscribe(val => {
      if(val) {
        ref.innerHTML = 'Verified!'
      } else {
        ref.innerHTML = 'Invalid / Expired'
      }
    });
  }

  rowClickEvent(rows) {
    if(this.hasRowClick) {
      this.fromCustomTableRowClickEvent.emit(rows);
    }
  }


}