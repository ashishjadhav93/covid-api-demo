import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteguardService {

  routeaccess: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor() { }


  setRouteAccess(value){
    this.routeaccess.next(value)
  }

  getRouteAccess(){
    return this.routeaccess.asObservable()
  }

}
