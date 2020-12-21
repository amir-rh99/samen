import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CRUDService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
    private http: HttpClient,
    private crud: CRUDService
  ) { }

  getComments(moduleId){
    return this.http.get(`${this.crud.base_url}/comments/modules/module/${moduleId}?order=date&type=desc&limit=10`,
    {
      headers: this.crud.headers.set('x-auth',localStorage.getItem('hash'))
    })
  }

  postComment(moduleId, comment, parentId){
    return this.http.post(`${this.crud.base_url}/comments/modules`,
    {
      "module_id" : moduleId,
      "comment" : comment,
      "parent_id" : parentId
    },
    {
      headers: this.crud.headers.set('x-auth', localStorage.getItem('hash'))
    })
  }

  getLikes(moduleId){
    return this.http.get(`${this.crud.base_url}/likes/modules/module/${moduleId}`,
    {
      headers: this.crud.headers.set('x-auth',localStorage.getItem('hash'))
    })
  }

  postLike(moduleId){
    return this.http.post(`${this.crud.base_url}/likes/modules`,
    {
      "module_id" : moduleId,
      "comment_id" : null
    },
    {
      headers: this.crud.headers.set('x-auth', localStorage.getItem('hash'))
    })
  }
}
