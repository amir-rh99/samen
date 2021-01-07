import { Component, OnInit } from '@angular/core';
import { GetServicesService } from 'src/app/services/get-services.service';
import { CRUDService } from 'src/app/services/crud.service';

import { NavbarComponent } from '../../components/navbar/navbar.component'
import { UserDataService } from 'src/app/services/userData.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { CouponService } from 'src/app/services/coupon.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  services;
  userId;
  base_url;
  dialog = "اینجا می‌تونی لیست همه‌ی خدمات سامانه رو ببینی و هر کدوم رو که خواستی انجام بدی...";

  constructor(
    private getServices: GetServicesService,
    private crud: CRUDService,
    private logOut: NavbarComponent,
    private breadcrumbService: BreadcrumbService,
    private couponService: CouponService
  ) {
   }
  ngOnInit(): void {
    let bread = [
      {
        route: '/',
        title: 'سرویس ها'
      }
    ];
    this.breadcrumbService.updateRoute(bread);
    
    this.userId = localStorage.getItem('id');
    this.base_url = this.crud.base_url;

    this.getAllServices();
  }

  getAllServices(){
    // const getServices = ()=>{
    //   this.services = this.getServices.services.filter(service=>{
    //     return service.type === '1'
    //   })
    //   this.services.forEach(service=>{
    //     if(service.slogan){
    //       service.slogan = service.slogan.substr(0, 14)
    //     }
    //   })
    //   console.log(this.services, " serviiiices**");
    // }
    // if(this.getServices.services == null ){
    //   this.getServices.getServices(this.userId, ()=>{
    //     console.log('*******0099');
        
    //     getServices();
    //   })
    // } else {
    //   getServices();
    // }    
    this.getServices.getServicesForBp(this.userId).subscribe((res:any)=>{
      this.services = res.filter(service=>{
            return service.type === '1'
          })
          this.services.forEach(service=>{
            if(service.slogan){
              service.slogan = service.slogan.substr(0, 14)
            }
          })
          console.log(this.services, " serviiiices**");
    })
  }
  serviceStatus(status:any[], activePayment){
    let result; // 1: anjamesh midam, 2:edame midam, 3:natayej, 4: anjamesh midam & pardakht shode
    if(status.length === 0){
      result = activePayment ? 2 : 1
    } else {
      if(+status[status.length - 1].status == 1){
        result = 2;
      } else if(+status[status.length - 1].status == 2){
        result = 3;
      }
    }
    return result;
  }

  public disabledCoupon = false;
  coupon = new FormControl('');
  public couponError: string = '';
  public couponSuccess: string = '';
  public showBpCoupon = localStorage.getItem('showBpCoupon' + localStorage.getItem('id'));
  checkCoupon(){
    this.disabledCoupon = true;
    console.log(this.coupon.value, null);
    let serial = this.coupon.value;
    if (serial === '') {
      this.couponError = "سریال کوپن را وارد کنید"
      this.disabledCoupon = false;

    } else {
      this.couponService.checkCoupon(serial, null).subscribe((res:any)=>{
        console.log(res, " **res of check");
        
        this.disabledCoupon = false;
        console.log(res);
        if(!res.shouldPay){
          this.useCoupon(serial,null)
        }
      }, err=>{
        this.disabledCoupon = false;
        this.couponError = err.error.error;
      })
    }
  }
  useCoupon(serial, moduleId){
    this.couponService.useCoupon(serial,moduleId).subscribe(res=>{
      console.log(res, " **res of use");
      this.couponError = null;
      this.getServices.services == null;
      this.services = null;
      this.getAllServices();
      localStorage.setItem('showBpCoupon'+this.userId, 'no')
      // this.enrollToService()
    })
  }
}
