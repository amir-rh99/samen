import { Injectable } from '@angular/core';
import { CRUDService } from './crud.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private crud: CRUDService,
    private http: HttpClient
  ) { }

  base_url = this.crud.base_url;

  hash = localStorage.getItem('hash');
  headers = new CRUDService().headers.set('x-auth', this.hash);

  getUserInfo(userId){
    return this.http.get(`${this.base_url}/users/${userId}`,{
      headers: this.headers
    })
  }

  isAuthenticated(){
    const promise = new Promise((resolve)=>{
      if(localStorage.getItem('hash') && localStorage.getItem('id')){
        // this.getUserInfo(localStorage.getItem('id')).subscribe(Res=>{
        //   resolve(true)
        // }, err=>{
        //   resolve(false)
        // })
        resolve(true)
      } else {
        resolve(false)
      }
    })
    return promise;
  }


}
