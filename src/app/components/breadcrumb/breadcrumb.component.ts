import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  routePath;
  constructor(
    private breadcrumbService: BreadcrumbService
  ) { }

  ngOnInit(): void {
    this.breadcrumbService.route.subscribe((route:any)=>{
      console.log();
      this.routePath = route;
    })
  }

}
