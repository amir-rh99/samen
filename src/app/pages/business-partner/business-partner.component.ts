import { Component, OnInit } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/api';
import { trigger,state,style,transition,animate } from '@angular/animations';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';


import * as moment from 'moment-jalaali'; // add this 1 of 4
import 'moment/min/locales'
import { GetServicesService } from 'src/app/services/get-services.service';
import { GeuUserDataService } from 'src/app/services/geu-user-data.service';
import { CRUDService } from 'src/app/services/crud.service';
import { ViewChild } from '@angular/core';
moment.locale('fa'); 

@Component({
  selector: 'app-business-partner',
  templateUrl: './business-partner.component.html',
  styleUrls: ['./business-partner.component.scss'],
//   animations: [
//     trigger('rowExpansionTrigger', [
//         state('void', style({
//             transform: 'translateX(-10%)',
//             opacity: 0
//         })),
//         state('active', style({
//             transform: 'translateX(0)',
//             opacity: 1
//         })),
//         transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
//     ])
// ]
})
export class BusinessPartnerComponent implements OnInit {

  products;
  loading: boolean;
  usersList;
  services;
  base_url;
  userId;
  @ViewChild('dt') table: Table;

  constructor(
    // private primengConfig: PrimeNGConfig,
    private userData: GeuUserDataService,
    private CRUD: CRUDService,
    private getUserData: GeuUserDataService
  ) { }

  ngOnInit() {
    this.base_url = this.CRUD.base_url;
    // this.primengConfig.ripple = true;
    this.userId = localStorage.getItem('id');

    this.getUserData.getUserInfo(this.userId).subscribe((userInfo:any)=>{
      let bp = userInfo.businessPartner;
      this.userData.getBusinessPartner(bp, null).subscribe((Res:any)=>{
        console.log(Res, " *****list");
        
        this.usersList = Res.users;
        this.services = Res.services;
        this.usersList.forEach(user=>{
          if(user.usedCoupon){
            user.usedCouponShort = user.usedCoupon.substr(0, 15)
          }
          if(user.register_date){
            user.jalali_register_date = moment(user.register_date).format('jYYYY/jM/jD')
          }
          if(user.passedServices){
            user.passedArray = user.passedServices.split(',')
            // console.log(passed, " passed");
          }
        })
        console.log(this.usersList, "user LIst");
        console.log(this.services, " servicees");
        
      })
      
    })


    let date = moment().format('L');

  }
  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
        let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result = null;

        if (value1 == null && value2 != null)
            result = -1;
        else if (value1 != null && value2 == null)
            result = 1;
        else if (value1 == null && value2 == null)
            result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
            result = value1.localeCompare(value2);
        else
            result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

        return (event.order * result);
    });
}
check(service: string, passed:(string)[]){
  return passed.includes(service)
}

}
