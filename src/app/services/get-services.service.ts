import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { CRUDService } from './crud.service';


@Injectable({
  providedIn: 'root'
})
export class GetServicesService {
  public services;
  public specificService: {}[] = [];
  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private crud: CRUDService
  ) { }
  getServices(userId, callback){
    this.http.get(`${this.auth.base_url}/services/status/${userId}`,{
      headers: this.crud.headers.set('x-auth',localStorage.getItem('hash'))
    }).subscribe(result=>{
      this.services = result;
      callback();
    })
  }

  getSpecificService(moduleName, callback){
    this.http.get(`${this.auth.base_url}/services/module/${moduleName}`,
    {
      headers: this.crud.headers.set('x-auth',localStorage.getItem('hash'))
    }).subscribe(result=>{
      this.specificService.push(result);
      callback();
    })
  }
  // getServices(userId){
  //   return this.http.get(`${this.auth.base_url}/services/status/${userId}`,{
  //     headers: this.crud.headers.set('x-auth',localStorage.getItem('hash'))
  //   })
  // }

  getSpecificServiceForTestRunner(moduleName){
    return this.http.get(`${this.auth.base_url}/services/module/${moduleName}`,
    {
      headers: this.crud.headers.set('x-auth',localStorage.getItem('hash'))
    })
  }

  enrollToService(moduleName, userId){
    return this.http.post(`${this.crud.base_url}/assessments/${moduleName}`,
    {
      "user_id": userId
    },
    {
      headers: this.crud.headers.set('x-auth', localStorage.getItem('hash'))
    })
  }

  getFullStructure(moduleName){
    return this.http.get(`${this.crud.base_url}/assessments/${moduleName}/full-structure/${moduleName}`,
    {
      headers: this.crud.headers.set('x-auth',localStorage.getItem('hash'))
    })
  }

  getResultOfAssessements(moduleName, userId){
    return this.http.get(`${this.crud.base_url}/assessments/${moduleName}/${userId}/record`,
    {
      headers: this.crud.headers.set('x-auth',localStorage.getItem('hash'))
    })
  }

}
