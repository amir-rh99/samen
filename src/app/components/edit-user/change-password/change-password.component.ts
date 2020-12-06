import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EditUserService } from 'src/app/services/edit-user.service';
import { GeuUserDataService } from 'src/app/services/geu-user-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  @ViewChild('currentPassword') currentPassword: ElementRef;
  @ViewChild('newPassword') newPassword: ElementRef;
  @ViewChild('againPassword') againPassword: ElementRef;
  userId;
  disabledState = false;
  userInfo;

  errorMessages={
    password: '',
    new_password: '',
    retry_new_password: ''
  }
  constructor(
    private editService: EditUserService,
    private getUserData: GeuUserDataService
  ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    this.getUserData.getUserInfo(this.userId).subscribe((userInfo:any)=>{
      this.userInfo = userInfo;
    })
  }

  changePassword(){
    this.disabledState = true;
    for(let error in this.errorMessages){
      this.errorMessages[error] = "";
    }
    let password = {
      "password" : this.currentPassword.nativeElement.value,
      "new_password" : this.newPassword.nativeElement.value,
      "retry_new_password" : this.againPassword.nativeElement.value
    }
    this.editService.changePassword(this.userId, password).subscribe(Res=>{
      console.log(Res, " pass change");
      
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
      })
      
      Toast.fire({
        icon: 'success',
        title: 'رمز عبور شما با موفقیت تغییر کرد'
      })

      this.disabledState = false;
      this.currentPassword.nativeElement.value = "";
      this.newPassword.nativeElement.value ="";
      this.againPassword.nativeElement.value = "";
    }, err=>{
      // console.log(err, " this is error");
      
      if(Array.isArray(err.error.error)){
      (err.error.error).forEach(error=>{
        if(error.field ===  "password"){
          this.errorMessages.password = error.message;
        } else if(error.field === "new_password"){
          this.errorMessages.new_password = error.message;
        } else if(error.field === "retry_new_password"){
          this.errorMessages.retry_new_password = error.message;
        }
      })
    } else {
      this.errorMessages.password = err.error.error
    }
    // console.log(this.errorMessages, " error mesaages");

        this.disabledState = false;
    }
    )
  }
}
