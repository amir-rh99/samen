import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(
    private breadCrumbService: BreadcrumbService
  ) { }

  ngOnInit(): void {
    // this.breadCrumbService.route.subscribe(res)
  }

}
