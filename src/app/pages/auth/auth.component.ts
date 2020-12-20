import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  constructor(
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.data.subscribe(url=>{
      // console.log(url);      
    })
  }

}
