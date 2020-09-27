import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { param } from 'jquery';
import { GetServicesService } from 'src/app/services/get-services.service';

import { Chart } from 'chart.js'

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  moduleName;
  userId;
  result;
  myData= []

  myChart;
  chart=[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private getServices: GetServicesService
  ) { 
  }
  dialog = "آخرین بار این آزمون رو چند روز پیش انجام دادی که نتایجش در ادامه اومده ..."

  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    this.activatedRoute.paramMap.subscribe(param=>{
      this.moduleName = param.get('moduleName');
    })

    this.getServices.getResultOfAssessements(this.moduleName, this.userId).subscribe((result:any)=>{
      console.log(result, " itttt");

      if(Array.isArray(result)){
        this.result = result[result.length - 1]
      } else{
        this.result = result;
      }
      console.log(typeof(this.myData), " type");
      

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

      },3000)


      console.log(this.result, " its result");
      console.log(this.myChart, " its Chart");
      console.log(this.myChart.labels, " its labels Chart");
      console.log(this.myData, " its data Chart");
      
    })
  }

}
