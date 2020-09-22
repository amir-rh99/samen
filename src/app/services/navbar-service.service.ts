import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class NavbarServiceService {

  constructor() { }

  private navState = new Subject<boolean>();
  navState$ = this.navState.asObservable();

  setNavbarState(state: boolean){
    this.navState.next(state)
  }
}
