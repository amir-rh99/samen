import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, EmailValidator, AbstractControl } from '@angular/forms'

import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { NavbarServiceService } from 'src/app/services/navbar-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  error = {
    fname: false,
    username: false,
    email: false,
    password: false,
    emailError: '',
    usernameError: ''
  };

  constructor(
    private registerService: LoginService,
    private route: Router,
    private formBuilder: FormBuilder,
    private navbarService: NavbarServiceService
  ) { }


  ngOnInit(): void {
  }
emailCheck = false;
userCheck = false;
  Register = this.formBuilder.group({
    fname: ['',[Validators.required]],
    username: ['',[Validators.required]],
    email: ['',[Validators.required, Validators.email],[this.emailCheck]],
    password: ['',[Validators.required]]
  })

  register(event){
    event.preventDefault();
    const target = event.target;
    const firtname = target.querySelector('#fname').value;
    const username = target.querySelector('#username').value;
    const email = target.querySelector('#email').value;
    const password = target.querySelector('#password').value;

    this.registerService.registerUser(firtname, username, email, password).subscribe((register:any)=>{
      if(register){
        for(let data in register){
          localStorage.setItem(data,register[data])
        }
        this.navbarService.setNavbarState(true);
        this.route.navigateByUrl('/home');
      }
    })
    
  }

  checkEmpty(id, value){
    // this.error.emailError = '';
    this.error[id] = false;
    if(value === ''){
      this.error[id] = true
    }

    if(id == 'email'){
      this.registerService.checkEmail(value).subscribe(Res=>{
        console.log(Res," su");
        this.error.emailError= '';
        this.emailCheck = true;
      }, err =>{
        console.log(err.error.error);
        this.error.emailError = err.error.error ;
      })
    }

    if(id == 'username'){
      this.registerService.checkUsername(value).subscribe(Res=>{
        this.error.usernameError='';
        console.log(Res," su");
        
      }, err =>{
        console.log(err.error.error);
        this.error.usernameError = err.error.error ;
      })
    }
  }

}
