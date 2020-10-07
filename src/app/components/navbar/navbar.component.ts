import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  route: string;
  Gohomepage=false;
  GoCountryInfo=false;
  updatelognews="4 new cases in Himachal Pradesh\n1 death in Meghalaya\n89 recoveries in Mizoram\n";

  constructor(
    location: Location,
    private router: Router
  ) {
    router.events.subscribe((val) => {  
      if(location.path() != '/manage-info'){ 
        this.Gohomepage=true;
      } else {
        this.Gohomepage=false;
      }

      if(location.path() != '/manage-country-info'){ 
        this.GoCountryInfo=true;
      } else {
        this.GoCountryInfo=false;
      }
    });
  }
 
  ngOnInit(): void {
    this.initFunction();
  }
  initFunction(){
    console.log(this.router.url);
    console.log(window.location.href)
  } 
}
