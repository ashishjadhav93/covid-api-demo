import { Injectable,EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URLS } from 'src/environments/configURL';
import { Observable, BehaviorSubject } from 'rxjs';
import {  } from 'events';
import { ManageInfoComponent,UserSelectedEventArgs } from '../components/manage-info/manage-info.component';
@Injectable({
  providedIn: 'root'
})
export class ManageInfoService {
  $stateDataInfo = new BehaviorSubject(null);
  user:UserSelectedEventArgs={
    selectedState:""
  }
  constructor(private http:HttpClient) { }

  statedatainfo(value){
    this.user.selectedState=value;
    this.$stateDataInfo.next(this.user)
    console.log(value)
  }
  getManageInfo():Observable<any[]> {   
    return this.http.get<any[]>(URLS.manageInfo.getInfo)
  }
  getmanageCountrynameInfo():Observable<any[]> {   
    return this.http.get<any[]>(URLS.manageCountryInfo.getCntryInfo)
  }
  getmanageCalendarViceData(selectedDate):Observable<any[]> {
    return this.http.get<any[]>(URLS.manageCalendarViceData.getCalendarViceData+"data-"+selectedDate+".min.json");
  } 
  getLogInfo():Observable<any[]> {   
    return this.http.get<any[]>(URLS.manageCountryLogInfo.getCntryLogInfo)
  }
  getTotalCountryCountInfo():Observable<any[]> {   
    return this.http.get<any[]>(URLS.countryTotalCount.getTotalCntryInfo)
  }
  getStateInfo():Observable<any[]> {   
    return this.http.get<any[]>(URLS.stateInfo.getStateNameInfo)
  }
  getStateName():Observable<any[]> {    
    return this.http.get<any[]>(URLS.stateName.getStateName)
  }
  germapChartInfo(selectedchartDistrict):Observable<any[]> {
    return this.http.get<any[]>(URLS.GetChartInfo.getMapDateInfo+"timeseries-"+selectedchartDistrict+".min.json");
  } 
  ///timeseries-MP.min.json
}
