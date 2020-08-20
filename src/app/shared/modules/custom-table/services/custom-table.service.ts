import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URLS } from 'src/environments/configURL';

@Injectable({
  providedIn: 'root'
})
export class CustomTableService {

  constructor(private http: HttpClient) { }

  manageProxyCheckStatus(value) {
    let url = URLS.manageProxy.checkStatus + value
    return this.http.get(url);
  }
}
