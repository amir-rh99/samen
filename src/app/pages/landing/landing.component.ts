import { Component, OnInit } from '@angular/core';
import { version } from '../../config'
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  public version: string = version;
  constructor() { }

  ngOnInit(): void {
  }

}
