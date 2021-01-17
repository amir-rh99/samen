import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, EmailValidator, AbstractControl } from '@angular/forms'

import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { NavbarServiceService } from 'src/app/services/navbar-service.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import * as moment from 'moment-jalaali'; // add this 1 of 4
import 'moment/min/locales'
moment.locale('en'); 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  disabledRegister: boolean = false;
  disabledForBirth: boolean = true;
  birthDate = '';
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
    
    this.birthYear.valueChanges.subscribe(res=>{
      this.birthMonth.enable()
    })
    this.birthMonth.valueChanges.subscribe(res=>{
      if(this.birthMonth.dirty){
        this.birthDay.enable()
      }
    })

    this.birthDay.valueChanges.subscribe(res=>{
      if(this.birthDay.dirty){
        let year = this.birthYear.value;
        let month = this.birthMonth.value;
        let day = this.birthDay.value;
  
        let birth = `${year}/${month}/${day} 00:00:00`
        console.log(birth);
        let m = moment(birth, 'jYYYY/jMM/jDD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
        this.birthDate = this.fixNumbers(m);
        console.log(this.birthDate);
        this.disabledForBirth = false;
      }
      
    })
  }
  
  birth_disabled = {
    month: true,
    day: true
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
  })
  birthYear = new FormControl({value: ''},Validators.required);
  birthMonth = new FormControl({value: '',disabled: true},Validators.required);
  birthDay = new FormControl({value: '',disabled: true},Validators.required);
  register(event){
    this.disabledRegister = true;
    let info = this.Register.value;
    info.birth_date = this.birthDate;
    console.log(info, " ***info");
    
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

  persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g]
  arabicNumbers  = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g]
  fixNumbers = function (str)
  {
    if(typeof str === 'string')
    {
      for(var i=0; i<10; i++)
      {
        str = str.replace(this.persianNumbers[i], i).replace(this.arabicNumbers[i], i);
      }
    }
    return str;
  };
}
