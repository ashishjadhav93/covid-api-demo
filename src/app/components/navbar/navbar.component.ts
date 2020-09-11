import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }
  sidebaropencloseValue=0;
  toggle
  ngOnInit(): void {
    this.initFunction();
  }
  initFunction(){
    this.sidebaropen()
  }
  sidebaropen(){
    if(this.sidebaropencloseValue==0){
      this.sidebaropencloseValue=100;
    }else{
      this.sidebaropencloseValue=0;
    }
  }
}
