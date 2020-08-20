import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { URLS } from 'src/environments/configURL';

@Injectable({
  providedIn: 'root'
})
export class AppLevelDataPassService {

  constructor(private http:HttpClient) { }

  bulkUpadePendingCount = new BehaviorSubject(null);
  activeNavbarLink = new BehaviorSubject(null);
  routerLoader = new BehaviorSubject(null);
  partnerName = new BehaviorSubject(null);

  getBulkUpdatePendingCount() {
    return this.bulkUpadePendingCount.asObservable();
  }

  setBulkUpdatePendingCount(value) {
    this.bulkUpadePendingCount = new BehaviorSubject(value);
  }

  setNavbarActiveLink(value) {
    this.activeNavbarLink.next(value)
  }

  getNavbarActiveLink() {}

  setRouterLoader(value) {
    this.routerLoader.next(value)
  }

  getRouterLoader() {
    return this.routerLoader.asObservable();
  }

  getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
        c = ca[i].replace(/^\s+/g, '');
        if (c.indexOf(cookieName) == 0) {
            return c.substring(cookieName.length, c.length);
        }
    }
    return '';
  }

  setPartnerName(name) {
    this.partnerName = new BehaviorSubject(null);
    this.partnerName.next(name);
  }

  getPartnerName() {
    return this.partnerName;
  }
  
}
