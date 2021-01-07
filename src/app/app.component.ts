import { Component, OnInit } from '@angular/core';
import { trigger, transition, group, query, style, animate} from '@angular/animations'
import { Router, NavigationEnd } from '@angular/router'
import { GeuUserDataService } from './services/geu-user-data.service';
import { GetServicesService } from './services/get-services.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // animations: [
  //   trigger('routeAnimation',[
  //     transition('* => *', [
  //       style({height: '100vh'}),
  //       query(':enter',style({transform:'translateX(100%)'})),
  //       query(':enter, :leave', style({position:'absolute', top:0, left:0, right:0})),
  //       group([
  //         query(':leave',[animate('0.3s cubic-bezier(.35, 0, .25, 1)',style({transform:'translateX(-100%)'}))]),
  //         query(':enter',[animate('0.3s cubic-bezier(.35, 0, .25, 1)',style({transform:'translateX(0)'}))]),

  //       ])
  //     ]),
  //     transition('* => *', [
  //       style({height: '100vh'}),
  //       query(':enter',style({transform:'translateX(-100%)'})),
  //       query(':enter, :leave', style({position:'absolute', top:0, left:0, right:0})),
  //       group([
  //         query(':leave',[animate('0.3s cubic-bezier(.35, 0, .25, 1)',style({transform:'translateX(100%)'}))]),
  //         query(':enter',[animate('0.3s cubic-bezier(.35, 0, .25, 1)',style({transform:'translateX(0)'}))]),

  //       ])
  //     ])
  //   ])
    
  // ]
})

// animations: [
//   trigger('routeAnimation',[
//     transition('1 => 2', [
//       style({height: '!'}),
//       query(':enter',style({transform:'translateX(100%)'})),
//       query(':enter, :leave', style({position:'absolute', top:0, left:0, right:0})),
//       group([
//         query(':leave',[animate('0.3s cubic-bezier(.35, 0, .25, 1)',style({transform:'translateX(-100%)'}))]),
//         query(':enter',[animate('0.3s cubic-bezier(.35, 0, .25, 1)',style({transform:'translateX(0)'}))]),

//       ])
//     ])
//   ])
export class AppComponent implements OnInit {
  title = 'Samen';
  constructor(
    private router: Router,
    private getServices: GetServicesService
    ){

  }
  ngOnInit(){
    this.getServices.getBpInfo();
    this.router.events.subscribe(event=>{
      if(!(event instanceof NavigationEnd)){
        return;
      }
      window.scrollTo(0,0)
    })
  }
  // getDepth(outlet){
  //     return outlet.activatedRouteData['depth']
  // }
}
