import { Component, OnInit } from '@angular/core';
import { GeuUserDataService } from 'src/app/services/geu-user-data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  loggedIn;
  userInfo;

  constructor(
    private getUserData: GeuUserDataService
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('id')){
      this.loggedIn = true;
    }

    this.getUserData.getUserInfo(localStorage.getItem('id')).subscribe(data=>{
      this.userInfo = data;
    })
  }

}
