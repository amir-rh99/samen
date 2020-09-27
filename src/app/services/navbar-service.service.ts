import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class NavbarServiceService {

  constructor() { }

  private navState = new Subject<boolean>();
  navState$ = this.navState.asObservable();

  private testState = new Subject<boolean>();
  testState$ = this.navState.asObservable();

  setNavbarState(state: boolean){
    this.navState.next(state)
  }

  setTestRunnerState(state: boolean){
    this.testState.next(state)
  }
}
