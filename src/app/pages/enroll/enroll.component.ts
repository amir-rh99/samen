import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { param } from 'jquery';
import { GetServicesService } from 'src/app/services/get-services.service';
import { CRUDService } from 'src/app/services/crud.service';
import { GeuUserDataService } from 'src/app/services/geu-user-data.service';
import { CommentsComponent } from 'src/app/components/comments/comments.component';
import { CommentsService } from 'src/app/services/comments.service';

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

  constructor(
    private activeRoute: ActivatedRoute,
    private getServices: GetServicesService,
    private crud: CRUDService,
    private getUserData: GeuUserDataService,
    private route: Router,
    private getLikes: CommentsService
  ) { }

  ngOnInit(): void {
    this.base_url = this.crud.base_url;
    this.userId = localStorage.getItem('id');
    this.activeRoute.paramMap.subscribe(param=>{
      this.moduleName = param.get('moduleName')
    })
    console.log(this.moduleName);
    this.getServices.getSpecificService(this.moduleName).subscribe((enroll:any)=>{
      this.enroll = enroll;
      this.moduleId = +enroll.id;
      // console.log(this.moduleId, " moodole id");

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
      this.dialog = enroll.dialog;
      this.getUserData.getUserEnrollforService(this.userId, enroll.id).subscribe((userEnroll:any)=>{
        this.userEnroll = userEnroll;

        // console.log(userEnroll, " user aeneroll");
      })
    })

  }
sayHi(){
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
  enrollToService(){
    this.getServices.enrollToService(this.moduleName, this.userId).subscribe(Res=>{
      this.route.navigateByUrl(`${this.enroll.route}/step`)
    })
  }

}
