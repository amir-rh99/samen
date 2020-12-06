import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CRUDService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

constructor(
  private http: HttpClient,
  private crud: CRUDService
) { }

checkAvailibilityOfServiceForUser(serviceId){
  return this.http.get(`${this.crud.base_url}/services/payed/${serviceId}`,{
    headers: this.crud.headers.set('x-auth', localStorage.getItem('hash'))
  })
}
checkCoupon(serial, serviceId){
  return this.http.put(`${this.crud.base_url}/coupon/check`,{
    "serial" : serial,
    "service_id" : serviceId
  },{
    headers: this.crud.headers.set('x-auth', localStorage.getItem('hash'))
  })
}
useCoupon(serial, serviceId){
  return this.http.put(`${this.crud.base_url}/coupon/use`,{
    "serial" : serial,
    "service_id" : serviceId
  },{
    headers: this.crud.headers.set('x-auth', localStorage.getItem('hash'))
  })
}
}
