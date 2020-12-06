import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class EditUserComponent implements OnInit {

  constructor(
    private breadcrumbService: BreadcrumbService
  ) { }

  ngOnInit(): void {
    let id = localStorage.getItem('id')
    let bread = {
      0:{
        name: 'پروفایل من',
        link: `users/${id}/profile`
      },
      1:{
        name: 'تنظیمات',
        link: `users/${id}/edit`
      }
    }
    this.breadcrumbService.updateRoute(bread)
  }

}
