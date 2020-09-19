import { Injectable,EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URLS } from 'src/environments/configURL';
import { Observable, BehaviorSubject } from 'rxjs';
import {  } from 'events';
import {ManageCountryInfoComponent} from '../components/manage-country-info/manage-country-info.component'
//import { ManageInfoComponent,UserSelectedEventArgs } from '../components/manage-info/manage-info.component';
@Injectable({
  providedIn: 'root'
})
export class ManageCountryInfoService {  
  constructor(private http:HttpClient) { }
  getmanageCountrynameInfo():Observable<any[]> {   
    return this.http.get<any[]>(URLS.manageCountryInfo.getCntryInfo)
  }
}
