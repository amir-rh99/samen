import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  public route = new EventEmitter<any>();
  public showServiceStateInProfile = new EventEmitter<boolean>();
constructor() { }

updateRoute(path){
  console.log(path, " *****path");
  this.route.emit(path);
}
updateProfileState(bool){
  this.showServiceStateInProfile.emit(bool)
}
}
