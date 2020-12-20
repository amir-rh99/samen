import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  routePath;
  noBread: boolean = false;
  constructor(
    private breadcrumbService: BreadcrumbService
  ) { }

  ngOnInit(): void {
    this.breadcrumbService.route.subscribe((route:any)=>{
      console.log();
      if(route[0].title === 'noBread') {
        this.noBread = true;
      } else {
        this.noBread = false;
        this.routePath = route;
      }
    })
  }

}
