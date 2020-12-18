import { Component, OnInit } from '@angular/core';
import { GetServicesService } from 'src/app/services/get-services.service';
import { CRUDService } from 'src/app/services/crud.service';

import { NavbarComponent } from '../../components/navbar/navbar.component'
import { UserDataService } from 'src/app/services/userData.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  services;
  userId;
  base_url;
  dialog = "اینجا می‌تونی لیست همه‌ی خدمات سامانه رو ببینی و هر کدوم رو که خواستی انجام بدی...|";

  constructor(
    private getServices: GetServicesService,
    private crud: CRUDService,
    private logOut: NavbarComponent,
  ) {
   }
  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    this.base_url = this.crud.base_url;
    
    const getServices = ()=>{
      this.services = this.getServices.services.filter(service=>{
        return service.type === '1'
      })
      this.services.forEach(service=>{
        if(service.slogan){
          service.slogan = service.slogan.substr(0, 14)
        }
      })
      console.log(this.services, " serviiiices");
    }
    if(this.getServices.services == null ){
      this.getServices.getServices(this.userId, ()=>{
        getServices();
      })
    } else {
      getServices();
    }    
  }

}
