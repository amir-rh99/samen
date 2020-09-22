import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  loggedIn;

  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem('id')){
      this.loggedIn = true;
    }
  }

}
