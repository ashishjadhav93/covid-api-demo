import { Injectable,EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URLS } from 'src/environments/configURL';
import { Observable } from 'rxjs';
import {  } from 'events';
import { StateInfoComponent } from '../components/state-info/state-info.component';
import { ManageInfoComponent,UserSelectedEventArgs } from '../components/manage-info/manage-info.component';
@Injectable({
  providedIn: 'root'
})
export class StateInfoService {
  
  constructor(private http:HttpClient) { }

}
