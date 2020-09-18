import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage;

  constructor(
    private loginService: LoginService,
    private route: Router
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
        this.route.navigateByUrl('/home')
      }
      
    }, err=>{
      this.errorMessage = err.error.error;
    })

    
    
  }
}
