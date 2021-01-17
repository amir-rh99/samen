import { Component, OnInit } from '@angular/core';
import { GeuUserDataService } from 'src/app/services/geu-user-data.service';
import { CRUDService } from 'src/app/services/crud.service';
import moment from 'moment';
import 'moment/min/locales'

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  userNotifs;
  unreadNotif;
  base_url;
  myNotifs =[];

  constructor(
    private getUserData: GeuUserDataService,
    private crud: CRUDService
  ) { }

  ngOnInit(): void {
    this.base_url = this.crud.base_url;

    this.getUserData.getUserNotif(localStorage.getItem('id')).subscribe((notif:any)=>{
      this.userNotifs = notif;
      this.unreadNotif = notif.unread;
      console.log(notif, " this is notif");
      
      this.userNotifs.data.forEach(notif=>{
        let des;
        if(notif.notification_type === "Comment"){
          let score = JSON.parse(notif.description).data.score;
          // moment.locale('fa');
          des = `بابت نظر خوبت ${score} امتیاز گرفتی`
        } else if (notif.notification_type === "Result"){
          let module_title = JSON.parse(notif.description).data.module_title;
          let module_name;
          des = `نتایج تکمیلی آزمون ${module_title} آماده شده است`
        }
        
        let mynotif = {
          source_name: notif.source_name,
          source_id: notif.source_id,
          date: notif.date,
          nowTime: moment(notif.date).locale('fa').startOf('seconds').fromNow(),
          description: des,
          data: JSON.parse(notif.description),
          type: notif.notification_type
        }
        this.myNotifs.push(mynotif)
      })
    })

  }

}
