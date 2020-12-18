import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CRUDService } from 'src/app/services/crud.service';
import { GeuUserDataService } from 'src/app/services/geu-user-data.service';
import { UserDataService } from 'src/app/services/userData.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  loggedIn;
  userInfo;
  myInfo;
  base_url;
  userId;
  otherResultsOfUSer;
  services;
  public userSelectedId;
  public medals;
  public birthdates;
  constructor(
    public getUserData: GeuUserDataService,
    private crud: CRUDService,
    private userDataService: UserDataService,
  ) { }

  ngOnInit(): void {
    this.base_url = this.crud.base_url;
    this.userId = localStorage.getItem('id')
    if(localStorage.getItem('id')){
      this.loggedIn = true;
    }
    
    let flag = true;
    this.userDataService.currentUserSelectedData.subscribe(id=>{
      flag = false;
      if(id !== this.userSelectedId){
        this.userSelectedId = id;
        this.userInfo = null;
      }
      if(id === localStorage.getItem('id')){
        this.userSelectedId = null;
        if(this.myInfo){
          this.userInfo = this.myInfo
        } else {
          this.getUserData.getUserInfo(localStorage.getItem('id')).subscribe(data=>{
            this.userInfo = data;
            this.myInfo = data;
          })
        }
      } else {
       this.getUserData.getUserInfo(id).subscribe(data=>{
          this.userInfo = data;
          this.getUserData.getBusinessPartner('faramooz', id).subscribe((res:any)=>{
            this.otherResultsOfUSer = res;
            this.services = res.services;
            if(this.otherResultsOfUSer.users[0].passedServices){
              this.otherResultsOfUSer.users[0].passedArray = this.otherResultsOfUSer.users[0].passedServices.split(',')
            }
            console.log( this.otherResultsOfUSer , " *//////////////*");
            
          })
        })
      }
 
    })
    setTimeout(()=>{
      if(flag){
        this.getUserData.getUserInfo(localStorage.getItem('id')).subscribe(data=>{
          this.userInfo = data;
          this.myInfo = data;
        })
      }
    },100)

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
  checkService(service: string, passed:(string)[]){
    return passed.includes(service)
  }
}
