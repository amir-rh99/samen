import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CRUDService } from 'src/app/services/crud.service';
import { EditUserService } from 'src/app/services/edit-user.service';
import { GeuUserDataService } from 'src/app/services/geu-user-data.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  userId;
  base_url;
  profileInfo;
  userInfo;
  disabledState = false;
  editState: boolean;
  localUserId;
  
  @ViewChild('userQuote') userQuote:ElementRef;

  userCountry = {
    id: 0,
    name: ''
  };
  userProvince = {
    id: 0,
    name: '',
    code: 0
  };
  userCity = {
    id: 0,
    name: ''
  };

  constructor(
    private crud: CRUDService,
    private getUserData: GeuUserDataService,
    private editUser: EditUserService,
    private userData: GeuUserDataService,

    private modalService: NgbModal,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
  ) { 

  }

  ngOnInit(): void {
    
    console.log(this.activeRoute.snapshot.params, " snapppp");
    
    this.activeRoute.params.subscribe(routeParams=>{
      this.loadUserDetail(routeParams.userId)
    })
    this.base_url = this.crud.base_url;
    // let URL = this.router.url;
    // let URL_AS_LIST = URL.split('/');
    // this.userId = URL_AS_LIST[2];
  
  }
loadUserDetail(userId){
  this.userId = userId;
    this.localUserId = localStorage.getItem('id');
    if(this.localUserId === this.userId){
      this.editState = true

    } else {
      this.editState = false
    }
    this.getUserData.getUserProfile(this.userId).subscribe((profile:any)=>{
      this.profileInfo = profile;
      this.userCountry.id = this.profileInfo.country;
      this.userProvince.id = this.profileInfo.province;
      this.userCity.id = this.profileInfo.city;
  
      console.log(this.profileInfo, " this is profile ingo");

      if(this.localUserId !== this.userId){
      let bread = {
        0: {
          name: `کاربر ${this.profileInfo.first_name}`,
          link: null
        }
      }
      this.breadcrumbService.updateRoute(bread)
      this.breadcrumbService.updateProfileState(false)
    } else {
      let bread = {
        0: {
          name: 'پروفایل من',
          link: null
        }
      }
      this.breadcrumbService.updateRoute(bread)
      this.breadcrumbService.updateProfileState(true)
    }
      this.editUser.getCountries().subscribe((countries:any)=>{
        console.log(countries , "list of countries");
        this.userCountry = countries.data.filter(obj=>{
          return obj.id === this.userCountry.id
        })
  
        // this.userCity = countries.data.filter(obj=>{
        //   return obj.id === this.userCity.id
        // })
        console.log(this.userCountry, " user country");
        
      })
      if(this.profileInfo.province !== null)
      this.editUser.getProvinces('iran').subscribe((provinces:any)=>{
        this.userProvince = provinces.data.filter(obj=>{
          return obj.id === this.userProvince.id
        })
  
        console.log(this.userProvince, " user provinces");
  
        if(this.profileInfo.city !== null)
        this.editUser.getCities(this.userProvince[0].code).subscribe((cities:any)=>{
          this.userCity = cities.data.filter(obj=>{
            return obj.id === this.userCity.id
          })
          console.log(this.userCity, "user Cities");
          
        })
      })
    })
  
    this.userData.getUserInfo(this.userId).subscribe((userInfo:any)=>{
      this.userInfo = userInfo;

    })
    
}
  saveQuote(content){
    this.disabledState = true;
    let textAreaValue = this.userQuote.nativeElement.value;
    let file = {
      quote: textAreaValue
    }
    this.editUser.updateUserInformation(this.profileInfo.id, file).subscribe(Res=>{
      console.log(Res);
      this.disabledState = false;

      this.modalService.dismissAll(content);
    })
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  cancel(contnet){
    this.modalService.dismissAll(contnet)
  }

  editQuote(element){
    element.focus()
  }
}
