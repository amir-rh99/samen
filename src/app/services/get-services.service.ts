import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { CRUDService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class GetServicesService {

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private crud: CRUDService
  ) { }

  getServices(userId){
    return this.http.get(`${this.auth.base_url}/services/status/${userId}`,{
      headers: this.crud.headers.set('x-auth',localStorage.getItem('hash'))
    })
  }


}
