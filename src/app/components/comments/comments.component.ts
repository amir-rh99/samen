import { Component, OnInit, Input } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { CRUDService } from 'src/app/services/crud.service';
import Swal from 'sweetalert2';
import * as moment from 'moment'; // add this 1 of 4
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import 'moment/min/locales'

moment.locale('fa'); 

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() content;
  constructor(
    private crud: CRUDService,
    private commentService: CommentsService
  ) { 
    let now = moment(); // add this 2 of 4
    console.log('hello world', now.format()); // add this 3 of 4
    console.log(now.add(7, 'days').format()); // add this 4of 4
  }
comments;
base_url;
userId;
pendingComments=[];
sucComments=[];


  ngOnInit(): void {
    this.userId = localStorage.getItem('id')
    this.base_url = this.crud.base_url;
    console.log(this.content, " its content");
    
    this.commentService.getComments(this.content).subscribe((comments:any)=>{
      this.comments = comments.data;
      this.comments.forEach(comment=>{
        if(comment.status == 1){
          comment.nowTime = moment(comment.date).startOf('seconds').fromNow();
          this.pendingComments.push(comment)
        } else if(comment.status == 2){
          comment.nowTime = moment(comment.date).startOf('seconds').fromNow();
          this.sucComments.push(comment)
        }
      })
    })
    this.sucComments.forEach
console.log(this.sucComments);

    
  }
  // sendComment(){
  //   let commentArea = document.getElementById('commentArea').innerHTML;
  //   this.pendingComments.push(commentArea)
  // }
  postComment(event){
    event.preventDefault();
    const target = event.target;
    const comment = target.querySelector('#commentArea');

    if(comment.value !== ''){
      
      console.log(comment.value, " this comment");
      
    this.commentService.postComment(this.content, comment.value).subscribe((Res:any)=>{
      // location.reload()
      // let thisComment = {
      //   user_id: localStorage.getItem('id'),
      //   user_nickname: localStorage.getItem('nickname'),
      //   comment: comment.value,
      //   date: moment().format(),
      //   nowTime : moment().startOf('seconds').fromNow()
      // }
      // this.pendingComments.unshift(thisComment)
 
      console.log(this.pendingComments);

      comment.value = '';
 
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        // didOpen: (toast) => {
        //   toast.addEventListener('mouseenter', Swal.stopTimer)
        //   toast.addEventListener('mouseleave', Swal.resumeTimer)
        // }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'کامنت شما دریافت شد و در لیست کامنت های در انتظار تایید قرار گرفت'
      })

    }, err=>{
      this.pendingComments.shift();
      comment.placeholder = err.error.error[0].message;
      setTimeout(()=>{
        comment.placeholder = "نظر شما..."
  
      },5000)
    })

    let thisComment = {
      user_id: localStorage.getItem('id'),
      user_nickname: localStorage.getItem('nickname'),
      comment: comment.value,
      date: moment().format(),
      nowTime : moment().startOf('seconds').fromNow()
    }

    this.pendingComments.unshift(thisComment)
    comment.value = "";

  } else {    
    comment.placeholder = "نظر خالی رو نمیتونی ارسال کنی :)"

    setTimeout(()=>{
      comment.placeholder = "نظر شما..."

    },5000)
  }
  }

}
