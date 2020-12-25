import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarServiceService } from 'src/app/services/navbar-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage;
  disabledState = false;
  @Output() loggedIn: EventEmitter<any> = new EventEmitter<any>();
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new  FormControl('',[Validators.required])
  })
  constructor(
    private loginService: LoginService,
    private route: Router,  
    private navbarService: NavbarServiceService,
    private breadcrumbService: BreadcrumbService
  ) { }

  ngOnInit(): void {
    let bread = [
      {
        title: 'noBread'
      }
    ]
    this.breadcrumbService.updateRoute(bread)
  }

  login(event){
    this.disabledState = true;

    let email = this.loginForm.controls['email'].value;
    let password = this.loginForm.controls['password'].value;

    this.loginService.loginUser(email,password).subscribe(login=>{
      this.disabledState = false;
      if(login){
        for(let data in login){
          localStorage.setItem(data, login[data])
        }
        this.navbarService.setNavbarState(true);
        if(login['role'] === 'businessPartner' || login['role'] === "admin" ) {
          this.navbarService.changeActiveBP(true)
        } else {
          this.navbarService.changeActiveBP(false)
        }
        // this.loginService.loggedIn.next(true);
        this.route.navigateByUrl('/home');
        location.reload()
      }
      
    }, err=>{
      this.disabledState = false;
      this.errorMessage = err.error.error;
    })

    
    
  }

  getEmitter(){
    return this.loggedIn;
  }
}
