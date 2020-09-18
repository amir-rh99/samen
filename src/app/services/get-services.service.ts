import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetServicesService {

  constructor(
    private auth: AuthService,
    private http: HttpClient
  ) { }

  getServices(userId){
    return this.http.get(`${this.auth.base_url}/services/status/${userId}`,{
      headers: this.auth.headers
    })
  }


}
