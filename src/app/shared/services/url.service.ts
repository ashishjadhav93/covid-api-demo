import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  navbarActiveLink : BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor() {    
  }

  setNavbarActiveLink(value) {    
    this.navbarActiveLink.next(value);        
  }

  getNavbarActiveLink():Observable<any> {
    return this.navbarActiveLink.asObservable();
  }

}
