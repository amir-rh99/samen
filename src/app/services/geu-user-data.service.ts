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
}
