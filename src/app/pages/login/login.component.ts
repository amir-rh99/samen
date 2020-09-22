import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarServiceService } from 'src/app/services/navbar-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage;
  @Output() loggedIn: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private loginService: LoginService,
    private route: Router,  
    private navbarService: NavbarServiceService
  ) { }

  ngOnInit(): void {
    
  }

  login(event){
    event.preventDefault();
    const target = event.target;
    const email = target.querySelector('#email').value;
    const password = target.querySelector('#password').value;
    
    this.loginService.loginUser(email,password).subscribe(login=>{
      if(login){
        for(let data in login){
          localStorage.setItem(data, login[data])
        }
        this.navbarService.setNavbarState(true);
        // this.loginService.loggedIn.next(true);
        this.route.navigateByUrl('/home');
      }
      
    }, err=>{
      this.errorMessage = err.error.error;
    })

    
    
  }

  getEmitter(){
    return this.loggedIn;
  }
}
