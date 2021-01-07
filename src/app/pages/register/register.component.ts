import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, EmailValidator, AbstractControl } from '@angular/forms'

import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { NavbarServiceService } from 'src/app/services/navbar-service.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  disabledRegister: boolean = false;
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
    private navbarService: NavbarServiceService,
    private breadcrumbService: BreadcrumbService
  ) { 
 
  }


  ngOnInit(): void {
    let bread = [
      {
        title: 'noBread'
      }
    ]
    this.breadcrumbService.updateRoute(bread);
  }
emailCheck = false;
userCheck = false;
  Register = this.formBuilder.group({
    first_name: ['',[Validators.required]],
    last_name: [''],
    username: ['',[Validators.required]],
    email: ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required]],
    sex: ['',Validators.required],
    mobile: ['',Validators.required],
    birth_date: ['1399-09-09 00:00:00', Validators.required]
  })

  register(event){
    this.disabledRegister = true;
    // console.log(this.Register.value);
    let info = this.Register.value;
    this.registerService.registerUser(info).subscribe((register:any)=>{
      this.disabledRegister = true;
      if(register){
        for(let data in register){
          localStorage.setItem(data,register[data])
        }
        this.navbarService.setNavbarState(true);
        localStorage.getItem('showBpCoupon'+ register['id']) ? '' :  localStorage.setItem('showBpCoupon'+ register['id'], 'yes')

        this.route.navigateByUrl('/home');
        location.reload()
      }
    }, err=>{
      this.disabledRegister = false;
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
