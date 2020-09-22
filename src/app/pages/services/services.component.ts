import { Component, OnInit } from '@angular/core';
import { GetServicesService } from 'src/app/services/get-services.service';
import { CRUDService } from 'src/app/services/crud.service';

import { NavbarComponent } from '../../components/navbar/navbar.component'

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  services;
  userId;
  base_url;

  constructor(
    private getservices: GetServicesService,
    private crud: CRUDService,
    private logOut: NavbarComponent
  ) {
   }
  ngOnInit(): void {

    this.userId = localStorage.getItem('id');
    this.base_url = this.crud.base_url;

    this.getservices.getServices(this.userId).subscribe((services:any)=>{
      this.services = services.filter(service=>{
        return service.type === '1';
      })
      this.services.forEach(service=>{
        if(service.slogan){
          service.slogan = service.slogan.substr(0, 20)
        }
      })
      console.log(this.services);
    }
    , err =>{
      if(err.status === 401 || err.status === 404){
        console.log("hiii");
        
        this.logOut.UnauthorizedLogOut()
      }
      
    }
    )


    
  }

}
