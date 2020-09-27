import { Injectable } from '@angular/core';
import { CRUDService } from './crud.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostServicesService {

  constructor(
    private crud: CRUDService,
    private http: HttpClient
  ) { }

  answerToAssessments(enrollId, moduleName,answers){
    return this.http.put(`${this.crud.base_url}/assessments/${moduleName}/full-answer/${enrollId}`,answers,
    {
      headers: this.crud.headers.set('x-auth',localStorage.getItem('hash'))
    })
  }
}
