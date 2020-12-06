import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn-loading',
  templateUrl: './btn-loading.component.html',
  styleUrls: ['./btn-loading.component.scss']
})
export class BtnLoadingComponent implements OnInit {
  @Input() content;
  constructor() { }

  ngOnInit(): void {
  }

}
