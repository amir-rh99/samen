import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { param } from 'jquery';
import { GetServicesService } from 'src/app/services/get-services.service';

import { Chart } from 'chart.js'
import * as moment from 'moment';
import { UserDataService } from 'src/app/services/userData.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { GeuUserDataService } from 'src/app/services/geu-user-data.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit,OnDestroy {
  moduleName;
  userId;
  result;
  myData= [];
  finishTime;
  public myId: string = localStorage.getItem('userId')
  myChart;
  chart=[];
  dialog ;
  selectedUserInfo;
  constructor(
    private activatedRoute: ActivatedRoute,
    private getServices: GetServicesService,
    private userDataService: UserDataService,
    private breadcrumbService: BreadcrumbService,
    private getUserdata: GeuUserDataService
  ) { 
  }
  ngOnDestroy(): void {
    this.userDataService.changeUserSelected(localStorage.getItem('id'))
  }

  ngOnInit(): void {
    let bread = [
      {
        title: 'سرویس ها' ,
        route: ''
      },
    ];
    this.breadcrumbService.updateRoute(bread)
    this.activatedRoute.paramMap.subscribe(param=>{
      this.moduleName = param.get('moduleName');
      console.log(param.get('userId'));
      if(param.get('userId')){
        this.userId = param.get('userId')
        this.userDataService.changeUserSelected(this.userId);
        this.getUserdata.getUserInfo(this.userId).subscribe(user=>{
          this.selectedUserInfo = user;          
        })
      } else {
        this.userId = localStorage.getItem('id');
      }
      this.loadResult()
    })
  }

  loadResult(){
    this.result = null;
    this.getServices.getResultOfAssessements(this.moduleName, this.userId).subscribe((result:any)=>{
      let bread
      if(this.userId === localStorage.getItem('id')){
        bread = [
          {
            title: 'سرویس ها' ,
            route: ''
          },
          {
            title: `آزمون ${result.service_title}`,
            route: this.moduleName
          },
          {
            title: 'نتیجه آزمون' ,
            route: `${this.moduleName}/result`
          }
        ];
      } else {
        bread = [
          {
            title: 'سرویس ها' ,
            route: ''
          },
          {
            title: `آزمون ${result.service_title}`,
            route: this.moduleName
          },
          {
            title: `نتیجه آزمون ${this.selectedUserInfo.nickname}` ,
            route: `${this.moduleName}/result/${this.userId}`
          }
        ];
      }

      this.breadcrumbService.updateRoute(bread);

      if(Array.isArray(result)){
        this.result = result[result.length - 1]
      } else{
        this.result = result;
      }
      console.log(typeof(this.myData), " type");
      this.finishTime = moment(this.result.finish_date).startOf('seconds').fromNow();
      if(this.userId === localStorage.getItem('id')){
        this.dialog = `آخرین بار این آزمون رو ${this.finishTime} انجام دادی که نتایجش در ادامه اومده ...`
      } else {
        this.dialog = ` ${this.selectedUserInfo.nickname} آخرین بار این آزمون رو ${this.finishTime}  داده که نتایجش در ادامه اومده ...`
      }
      this.result.text.answer.forEach(answer=>{
        if(answer.title === "CHART"){
          this.myChart = answer;
          // console.log(this.myChart, " my chart");
          for (let key in this.myChart.chart){
            this.myData.push(this.myChart.chart[key])
          }
        }

      })
      setTimeout(()=>{
if(this.result.service_title==="تیپ شخصیتی من"){

  this.chart = new Chart('canvas', {
    type: 'radar',
    data: {
      labels: this.myChart.labels,
      datasets: [
        { 
          data: this.myData,
          borderColor: "#3cba9f",
          fill: 'none',
          lineTension: 0,           
        }
      ]
    },
    options: {
      legend: {
        display: false
      },
      // scales: {
      //   xAxes: [{
      //     display: true
      //   }],
      //   yAxes: [{
      //     display: true
      //   }],
      // }
    }
  });
} else {
  this.chart = new Chart('canvas', {
    type: 'line',
    data: {
      labels: this.myChart?.labels,
      datasets: [
        { 
          data: this.myData,
          borderColor: "#3cba9f",
          fill: 'none',
          lineTension: 0,           
        }
      ]
    },
    options: {
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: true
        }],
        yAxes: [{
          display: true
        }],
      }
    }
  });
}

      },2000)


      console.log(this.result, " its result");
      console.log(this.myChart, " its Chart");
      console.log(this.myChart?.labels, " its labels Chart");
      console.log(this.myData, " its data Chart");
      
    })
  }
}
