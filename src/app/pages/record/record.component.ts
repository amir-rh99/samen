import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { CRUDService } from 'src/app/services/crud.service';
import { GetServicesService } from 'src/app/services/get-services.service';
import { GeuUserDataService } from 'src/app/services/geu-user-data.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {
  public userId;
  public services;
  public base_url;
  public nickname;
  public dialog: string = 'یادداشت‌های مدیریتی شما برای هر فرد در این قسمت ثبت می‌شود، این یادداشت‌ها فقط توسط مدیران قابل رویت هستند و به بررسی سوابق و روند عملکرد هر یک از کارکنان کمک خواهند کرد.|'
  constructor(
    private breadcrumbService: BreadcrumbService,
    private getServices: GetServicesService,
    private activatedRoute: ActivatedRoute,
    private crud: CRUDService,
    private getUserService: GeuUserDataService
  ) { }

  ngOnInit(): void {
    this.base_url = this.crud.base_url;
    this.activatedRoute.paramMap.subscribe(param=>{
      this.userId = param.get('userId')
    })

    this.loadServices();
    this.loadUser();
  } 
  loadUser(){
    let bread = [
      {
        title: 'کاربران من' ,
        route: 'business-partner'
      },
    ];
    this.breadcrumbService.updateRoute(bread)
    this.getUserService.getUserInfo(this.userId).subscribe((user:any)=>{
      this.nickname = user.nickname;
      user = user;
      let bread = [
        {
          title: 'کاربران من' ,
          route: 'business-partner'
        },
        {
          title: `پرونده کاربر : ${this.nickname}`,
          route: `business-partner/record/${user.id}`
        },
  
      ];
      this.breadcrumbService.updateRoute(bread)
    })
  }
  loadServices(){
    this.getServices.getServicesForBp(this.userId).subscribe((services:any)=>{
      this.services = services.filter(service=>{
        return service.type === '1'
      })   
      this.services.forEach(service=>{
        if(service.slogan){
          service.slogan = service.slogan.substr(0, 14)
        }
      })
      let service = {
        title: 'خلاصه مدیریتی' ,
        route: '',
        icon: null
      }
      // this.services.unshift(service)
      console.log(this.services, " serviiiices");

    })
  }

}
