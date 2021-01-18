import { Component, OnInit } from '@angular/core';
import { trigger, transition, group, query, style, animate} from '@angular/animations'
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router'
import { GeuUserDataService } from './services/geu-user-data.service';
import { GetServicesService } from './services/get-services.service';
import { Observable } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
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
    private getServices: GetServicesService,
    private activeRoute: ActivatedRoute,
    private route: Router
    ){

  }
  fullWidth$: Observable<boolean>;
  private defaultfullWidth = false;
  ngOnInit(){
    
    this.fullWidth$ = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => this.activeRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      mergeMap(route => route.data),
      map(data => data.hasOwnProperty('fullWidth') ? data.fullWidth : this.defaultfullWidth),
    )

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
