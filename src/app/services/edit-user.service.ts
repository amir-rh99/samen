import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CRUDService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class EditUserService {

  constructor(
    private crud: CRUDService,
    private http: HttpClient
  ) { }

  updateUserInformation(profileId: number, object: object){
    return this.http.put(`${this.crud.base_url}/profiles/${profileId}`,
    object,
    {
      headers: this.crud.headers.set('x-auth', localStorage.getItem('hash'))
    })
  }

  changeAvatar(userId, avatar: object){
    return this.http.put(`${this.crud.base_url}/users/${userId}/avatar`,
    avatar,{
      headers: this.crud.headers.set('x-auth', localStorage.getItem('hash'))
    }
    )
  }

  changePassword(userId, password){
    return this.http.put(`${this.crud.base_url}/users/${userId}/passChange`,
    password,
    {
      headers: this.crud.headers.set('x-auth', localStorage.getItem('hash'))
    })
  }

  getCountries(){
    return  this.http.get(`${this.crud.base_url}/area/countries?limit=200 `,
    {
      headers: this.crud.headers.set('x-auth', localStorage.getItem('hash'))
    })
  }

  getProvinces(countryName){
    return this.http.get(`${this.crud.base_url}/area/province/${countryName}/name`,
    {
      headers: this.crud.headers.set('x-auth', localStorage.getItem('hash'))
    })
  }
  getCities(provinceCode){
    return this.http.get(`${this.crud.base_url}/area/city/${provinceCode}`,
    {
      headers: this.crud.headers.set('x-auth', localStorage.getItem('hash'))
    })
  }
}
