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


  constructor(
    private activatedRoute: ActivatedRoute,

    private navbarService: NavbarServiceService,
    private route: Router,
    private crud: CRUDService
  ) {
    this.navbarService.navState$.subscribe((state)=>{
      this.loggedIn = state;
    })

    this.navbarService.testState$.subscribe((state)=>{
      this.testState = state;
    })

  }

  ngOnInit(): void {
    


 this.base_url = this.crud.base_url;
    if(localStorage.getItem('hash')){
      this.loggedIn = true;
    }
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
