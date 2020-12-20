import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { param } from 'jquery';
import { GetServicesService } from 'src/app/services/get-services.service';
import { CRUDService } from 'src/app/services/crud.service';
import { GeuUserDataService } from 'src/app/services/geu-user-data.service';
import { CommentsComponent } from 'src/app/components/comments/comments.component';
import { CommentsService } from 'src/app/services/comments.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { FormControl } from '@angular/forms';
import { CouponService } from 'src/app/services/coupon.service';

@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.scss']
})
export class EnrollComponent implements OnInit {
  moduleName;
  moduleId;
  enroll;
  base_url;
  dialog;
  uses;
  userEnroll;
  userId;
  likesNumber;
  isLike;
  coupon = new FormControl('');
  public couponError: string = '';
  @ViewChild('moreContent') moreContent: ElementRef;

  constructor(
    private activeRoute: ActivatedRoute,
    private getServices: GetServicesService,
    private crud: CRUDService,
    private getUserData: GeuUserDataService,
    private route: Router,
    private getLikes: CommentsService,
    private breadcrumbService: BreadcrumbService,
    private modalService: NgbModal,
    private couponService: CouponService
  ) { }

  ngOnInit(): void {
    this.dialog = 'onLoad';
    this.base_url = this.crud.base_url;
    this.userId = localStorage.getItem('id');
    this.activeRoute.paramMap.subscribe(param=>{
      this.moduleName = param.get('moduleName')
    })
    let bread = [
      {
        title: 'سرویس ها',
        route: '/'
      },
    ]
    this.breadcrumbService.updateRoute(bread)
    this.getEnrollService();

  }

  getEnrollService(){
    const specificService = (enroll)=>{
    
      this.dialog = enroll.dialog;
      console.log(enroll, " ***enroll services");
      this.enroll = enroll;
      this.moduleId = +enroll.id;
      let bread = [
        {
          title: 'سرویس ها',
          route: '/'
        },
        {
          title: `آزمون ${enroll.title}`,
          route: enroll.route
        }
      ]
      this.breadcrumbService.updateRoute(bread)
      this.getLikes.getLikes(this.moduleId).subscribe((likes:any)=>{
        this.likesNumber = likes.count;
        likes.data.forEach(item=>{
          if(item.user_id == localStorage.getItem('id')){
            this.isLike = true;
          }
        })   
        console.log(likes, ' liiike');
        
      })

      this.uses = JSON.parse(enroll.uses);
      this.getUserData.getUserEnrollforService(this.userId, enroll.id).subscribe((userEnroll:any)=>{
        this.userEnroll = userEnroll;
      })
    }
    let result = false;
    this.getServices?.specificService?.forEach((service:any)=>{
      if(service.route === this.moduleName){
        result = true;
        specificService(service);
      }
    })
    if(!result){
      this.getServices.getSpecificService(this.moduleName, ()=>{
        specificService(this.getServices.specificService[this.getServices.specificService.length - 1])
      })
    }
  }
  likeIt(){
  this.getLikes.postLike(this.moduleId).subscribe((Res:any)=>{
    if(Res.success === "like"){
      this.likesNumber++;
      this.isLike = true;
    } else {
      this.likesNumber--;
      this.isLike = false
    }
    // console.log(Res, " like com");
  })
}
openEnrollToServiceModal(modal){
  this.modalService.open(modal , { size: 'lg'})
}
  enrollToService(){
    this.getServices.enrollToService(this.moduleName, this.userId).subscribe(Res=>{
      this.route.navigateByUrl(`${this.enroll.route}/step`)
    })
  }
  checkCoupon(){
    console.log(this.coupon.value, this.enroll.id);
    let serial = this.coupon.value;
    if (serial === '') {
      this.couponError = "سریال کوپن را وارد کنید"
    } else {
      this.couponService.checkCoupon(serial, this.enroll.id).subscribe(res=>{
        console.log(res);
        
      }, err=>{
        this.couponError = err.error.error;
      })
    }
  }
}
