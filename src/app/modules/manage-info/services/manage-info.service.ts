import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URLS } from 'src/environments/configURL';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ManageInfoService {
  constructor(private http:HttpClient) { }
  getManageInfo():Observable<any[]> {   
    return this.http.get<any[]>(URLS.manageInfo.getInfo)
  }
  getmanageCountrynameInfo():Observable<any[]> {   
    return this.http.get<any[]>(URLS.manageCountryInfo.getCntryInfo)
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
}
