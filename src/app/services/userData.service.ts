import { EventEmitter, Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})

export class UserDataService {
    currentUserSelectedData = new EventEmitter();

    changeUserSelected(data){
        this.currentUserSelectedData.emit(data)
    }
}