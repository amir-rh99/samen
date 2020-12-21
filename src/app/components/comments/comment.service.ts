import { EventEmitter, Injectable } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  public pendingComments: {}[] = [];
  public commentsList: {}[] = [];
  public onSendMessage = new EventEmitter();

  constructor(
    private commentsService: CommentsService
  ) { }

  resetData(){
    this.pendingComments = [];
    this.commentsList = [];
  }
  getComments(moduleId, callback){
    this.commentsService.getComments(moduleId).subscribe((comments:any)=>{
      console.log(comments, " ***comments");
      comments.data.forEach((comment:any)=>{
        if(comment.status == 1) {
          this.pendingComments.push(comment)
        } else if (comment.status == 2){
          this.commentsList.push(comment)
        }
      })
      callback()
    })
  }
  sendComment(moduleId, comment, parentId, commentSelected){
    this.commentsService.postComment(moduleId,comment,parentId).subscribe(res=>{
      this.onSendMessage.emit('sended')
      if(parentId){
        commentSelected.child.unshift(res)
      } else {
        this.pendingComments.unshift(res);
      }
    },err=>{
      let error = err.error.error[0].message;
      this.onSendMessage.emit(error)      
    })
  }
}
