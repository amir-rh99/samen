import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CRUDService } from 'src/app/services/crud.service';
import { GeuUserDataService } from 'src/app/services/geu-user-data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  loggedIn;
  userInfo;
  base_url;
  userId;
  public medals;
  public birthdates;
  constructor(
    public getUserData: GeuUserDataService,
    private crud: CRUDService
  ) { }

  ngOnInit(): void {

    this.base_url = this.crud.base_url;
    this.userId = localStorage.getItem('id')
    if(localStorage.getItem('id')){
      this.loggedIn = true;
    }

    this.getUserData.getUserInfo(localStorage.getItem('id')).subscribe(data=>{
      this.userInfo = data;
    })

    this.getMedals();
    this.getUserBirthdates();
  }

  getMedals(){
    this.getUserData.getUserMedals(this.userId).subscribe((medals:any)=>{
      this.medals = medals;
      console.log(medals, " ***+++medals");
    })
  }

  getUserBirthdates(){
    this.getUserData.getUserBirthdates().subscribe((bd:any)=>{
      this.birthdates = bd;
      console.log(bd, " **+---bd*");
      
    })
  }

}
