import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-lost-password',
  templateUrl: './lost-password.component.html',
  styleUrls: ['./lost-password.component.scss']
})
export class LostPasswordComponent implements OnInit {
  email;
  message = {
    succsses: '',
    error: ''
  };
  constructor(
    private resetService: LoginService
  ) { }

  ngOnInit(): void {
  }
length;
part1email;
part2email;
  reset(event){
    event.preventDefault();
    const target = event.target;
    const email = target.querySelector('#username').value;
    
    this.resetService.resetPassword(email).subscribe((Res:any)=>{
      this.email = Res.email;
      this.length = this.email.length;
      console.log(this.length);
      
      this.part1email = this.email.substr(0,3);
      this.part2email = this.email.substr((length-10),10)

      console.log(this.part1email, this.part2email);
      
      this.message.error = "";
      this.message.succsses = `لینک تغییر رمز به ${this.part1email} **** ${this.part2email} فرستاده شد`
console.log(Res);

    }, err=>{
      this.message.succsses = "";
      this.message.error = err.error.error;
    })
    

  }
}
