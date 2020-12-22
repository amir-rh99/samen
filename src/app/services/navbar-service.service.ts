import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class NavbarServiceService {

  constructor() { }
   activeBP = new BehaviorSubject(null);

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

  changeActiveBP(data){
    this.activeBP.next(data)
  }
}
