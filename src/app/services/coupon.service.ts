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
  let url;
  let content;
  if(serviceId){
    url = `${this.crud.base_url}/coupon/check`;
    content = {
      "serial" : serial,
      "service_id" : serviceId
    }
  } else {
    url = `${this.crud.base_url}/coupon/check-info`;
    content = {
      "serial" : serial,
    }
  }
  return this.http.put(url,content,{
    headers: this.crud.headers.set('x-auth', localStorage.getItem('hash'))
  })
}
useCoupon(serial, serviceId){
  let url;
  let content;
  if(serviceId){
    url = `${this.crud.base_url}/coupon/use`;
    content = {
      "serial" : serial,
      "service_id" : serviceId
    }
  } else {
    url = `${this.crud.base_url}/coupon/use-all`;
    content = {
      "serial" : serial,
    }
  }
  return this.http.put(url,content,{
    headers: this.crud.headers.set('x-auth', localStorage.getItem('hash'))
  })
}
}
