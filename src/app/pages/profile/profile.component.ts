import { Component, OnInit } from '@angular/core';
import { GetServicesService } from 'src/app/services/get-services.service';
import { CRUDService } from 'src/app/services/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  services;
  userId;
  base_url;
  showState;

  constructor(
    private getServices: GetServicesService,
    private crud: CRUDService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private breadcrumbService: BreadcrumbService
  ) { }

  ngOnInit(): void {
    // let bread = {
    //   0: {
    //     name: 'پروفایل',
    //     link: null
    //   }
    // }
    // this.breadcrumbService.updateRoute(bread)
    // console.log(this.activeRoute.paramMap.pipe, " profillle snap");
    let URL = this.router.url;
    let URL_AS_LIST = URL.split('/');
    this.userId = URL_AS_LIST[2];
    this.base_url = this.crud.base_url;
    this.activeRoute.params.subscribe(routeParams=>{
      this.loadUserDetail();
    })


  }
  loadUserDetail(){
    // this.userId = userId;
    console.log(this.userId, "useeeeeeeeeeeeer id");
    this.breadcrumbService.showServiceStateInProfile.subscribe(res=>{
      if(res){
        this.showState = true
      } else {
        this.showState = false
      }
    })
    let bread = [
      {
        title: 'پروفایل من',
        route: null
      }
    ]
    this.breadcrumbService.updateRoute(bread)
    // if(this.userId === localStorage.getItem('id')){

    //   let bread = {
    //     0: {
    //       name: 'پروفایل من',
    //       link: null
    //     }
    //   }
    //   this.breadcrumbService.updateRoute(bread)
    // } else {

    // }
    this.userId = localStorage.getItem('id');

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
