import { Injectable } from '@angular/core';
import { CRUDService } from './crud.service';
import { HttpClient } from '@angular/common/http';
import { businessPartner } from '../config'
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private crud: CRUDService,
    private http: HttpClient
  ) { }

  loginUser(username,password){
    return this.http.post(`${this.crud.base_url}/authentication/login`,{
      username,
      password
    },{
      headers: this.crud.headers
    })
  }

  
  registerUser(userInfo){
    let content = {
      "bp": businessPartner,
      "userInfo": userInfo
    }
    return this.http.post(`${this.crud.base_url}/bp/register`, content,{
      headers: this.crud.headers
    })
  }

  checkEmail(email){
    return this.http.put(`${this.crud.base_url}/users/exist-email`, {
      'email': email
    }, {
      headers: this.crud.headers
    })
  }

  checkUsername(username){
    return this.http.put(`${this.crud.base_url}/users/exist-username`, {
      'username': username
    }, {
      headers: this.crud.headers
    })
  }
  
  resetPassword(email){
    return this.http.post(`${this.crud.base_url}/users/reset`,{
      "string": email
    },{
      headers: this.crud.headers
    })
  }
}
