import { Injectable } from '@angular/core';
import { CRUDService } from './crud.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeuUserDataService {

  constructor(
    private crud: CRUDService,
    private http: HttpClient
  ) { }

  getUserInfo(userId){
    return this.http.get(`${this.crud.base_url}/users/${userId}`,
    {
      headers:this.crud.headers.set('x-auth',localStorage.getItem('hash'))
    })
  }

  getUserEnrollforService(userId, moduleId){
    return this.http.get(`${this.crud.base_url}/users/${userId}/enrolls/${moduleId}`,
    {
      headers: this.crud.headers.set('x-auth',localStorage.getItem('hash'))
    })
  }

  getUserNotif(userId){
    return this.http.get(`${this.crud.base_url}//notification/?filter[dest_id]=${userId}&limit=5`,
    {
      headers: this.crud.headers.set('x-auth', localStorage.getItem('hash'))
    })
  }

  getUserProfile(userId){
    return this.http.get(`${this.crud.base_url}/users/${userId}/profile`,
    {
      headers: this.crud.headers.set('x-auth', localStorage.getItem('hash'))
    })
  }
  getBusinessPartner(bp, dontNow){
    return this.http.get(`${this.crud.base_url}/bp/summary/${bp}`,
    {
      headers: this.crud.headers.set('x-auth', localStorage.getItem('hash'))
    })
  }

  getUserPic(userId){
    if(userId === null){
      userId = localStorage.getItem('id')
    }
    return `${this.crud.base_url}/users/${userId}/avatar`
  }

  getUserMedals(userId){
    return this.http.get(`${this.crud.base_url}/medals/user/${userId}?order=medalStatus`,{
      headers: this.crud.headers.set('x-auth', localStorage.getItem('hash'))
    })
  }

  getUserBirthdates(){
    return this.http.get(`${this.crud.base_url}/users/birthdays?limit=15`,{
      headers: this.crud.headers.set('x-auth', localStorage.getItem('hash'))
    })
  }
}
