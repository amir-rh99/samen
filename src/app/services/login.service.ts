import { Injectable } from '@angular/core';
import { CRUDService } from './crud.service';
import { HttpClient } from '@angular/common/http';

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

  
  registerUser(nickname, username, email, password){
    return this.http.post(`${this.crud.base_url}/users/register`,{
      "email" : email,
      "password" : password,
      "username" : username,
      "nickname" : nickname
    },{
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
