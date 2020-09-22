import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { NavbarServiceService } from 'src/app/services/navbar-service.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userHash;
  loggedIn;

  constructor(
    // private auth: AuthService,
    // private loginService: LoginService,
    // private loginComp: LoginComponent,
    private navbarService: NavbarServiceService,
    private route: Router
  ) {
    this.navbarService.navState$.subscribe((state)=>{
      this.loggedIn = state;
    })
    // this.loginService.isloggedIn().subscribe(loggedIn=>{
    //   this.loggedIn = loggedIn;
    // })
  }

  ngOnInit(): void {
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
  
  //  let items = ['hash', 'id', 'lastLogin', 'role', 'newLogin', 'day', 'nickname'];
  //  items.forEach(item=>{
  //    localStorage.removeItem(item);
  //  })
  //  this.navbarService.setNavbarState(false);
  //  this.loggedIn = false;
  //  this.route.navigateByUrl('auth/login');
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
