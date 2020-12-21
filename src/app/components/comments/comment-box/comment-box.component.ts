import { Component, Input, OnInit } from '@angular/core';
import { CRUDService } from 'src/app/services/crud.service';

import * as moment from 'moment';
import 'moment/min/locales'
moment.locale('fa'); 

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.scss']
})
export class CommentBoxComponent implements OnInit {
  @Input() comment;
  @Input() secondChild;
  public userId: string = localStorage.getItem('id');
  public base_url: string;
  public firstChild;
  public showSendComment: boolean = false;

  constructor(
    private crudService: CRUDService
  ) { }

  ngOnInit(): void {
    this.comment.parent_id ? this.firstChild = true : this.firstChild = false;
    this.base_url = this.crudService.base_url;
  }

  getDate(data){
    return moment(data).startOf('seconds').fromNow();
  }

  closeSendBox(){
    this.showSendComment = false;
  }
}
