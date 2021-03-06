import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { NavbarServiceService } from 'src/app/services/navbar-service.service';
import { Router, ActivatedRoute, RouterState } from '@angular/router';
import * as $ from "jquery";


import Swal from 'sweetalert2'

import { GetServicesService } from 'src/app/services/get-services.service';
import { CRUDService } from 'src/app/services/crud.service';
import { GeuUserDataService } from 'src/app/services/geu-user-data.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userHash;
  loggedIn;
  testState;
  base_url;
  userId;
  activeBP: boolean = false;
  public bpInfo: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    protected getUserData: GeuUserDataService,
    private navbarService: NavbarServiceService,
    private route: Router,
    private crud: CRUDService,
    private getServices: GetServicesService
  ) {
    this.navbarService.navState$.subscribe((state)=>{
      this.loggedIn = state;
    })

    this.navbarService.testState$.subscribe((state)=>{
      this.testState = state;
    })

  }

  ngOnInit(): void {
    this.getServices.bpInfo.subscribe((bpInfo)=>{
      this.bpInfo = bpInfo;
      console.log(bpInfo);
      
    })
    this.navbarService.activeBP.subscribe(data=>{
      data ? this.activeBP = true : this.activeBP = false

      this.userId = localStorage.getItem('id')
      this.loggedIn = true;
    })
    if(localStorage.getItem('role') === 'businessPartner' || localStorage.getItem('role') === 'admin'){
      this.activeBP = true;
    }
    if(!localStorage.getItem('id')){
      this.loggedIn = false
    }
 this.base_url = this.crud.base_url;
    // if(localStorage.getItem('hash')){
    //   this.loggedIn = true;
    // }
  }
  logOut(){

        let items = ['hash', 'id', 'lastLogin', 'role', 'newLogin', 'day', 'nickname'];
        items.forEach(item=>{
          localStorage.removeItem(item);
        })
        this.navbarService.setNavbarState(false);
        this.loggedIn = false;
        this.route.navigateByUrl('auth/login');

  }
  
toggle = false;

  open_sidebar(){
    this.toggle = true
  }

  close_sidebar(){
    this.toggle = false;
  }

  UnauthorizedLogOut(){
    Swal.fire({
      icon: 'error',
      title: 'دسترسی شما به این بخش ممکن نیست',
      text: 'لطفا دوباره وارد شوید',
    })
    let items = ['hash', 'id', 'lastLogin', 'role', 'newLogin', 'day', 'nickname'];
    items.forEach(item=>{
      localStorage.removeItem(item);
    })

    this.navbarService.setNavbarState(false);
    this.loggedIn = false;
    this.route.navigateByUrl('auth/login');

  }
  onResize(event) {
    if(event.target.innerWidth>992){
      this.toggle = false
    }
  }
}
