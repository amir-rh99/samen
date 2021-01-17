import { Component, Input, OnInit, Output,EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CRUDService } from 'src/app/services/crud.service';
import { GeuUserDataService } from 'src/app/services/geu-user-data.service';
import Swal from 'sweetalert2';
import { CommentService } from '../comment.service';
import { businessPartner } from '../../../config'
@Component({
  selector: 'app-send-comment',
  templateUrl: './send-comment.component.html',
  styleUrls: ['./send-comment.component.scss']
})
export class SendCommentComponent implements OnInit {
  userId: string = localStorage.getItem('id');
  base_url: string;
  @Input() moduleId;
  @Input() parentId;
  @Input() comment;
  @Input() userBpId;
  @Output() onCloseSendBox: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('textArea') textArea;
  textComment = new FormControl('');
  recordTitle = new FormControl('');
  public disabledSend: boolean = false;
  constructor(
    private commentService: CommentService,
    private crudService: CRUDService,
    private getUserData: GeuUserDataService
  ) { }

  ngOnInit(): void {
    this.base_url = this.crudService.base_url;
  }

  timeOut;
  sendComment(){
    clearTimeout(this.timeOut)
    let commentValue = this.textComment.value;
    if (commentValue === ''){
      this.textArea.nativeElement.placeholder = 'نظر خالی رو نمیتونی ارسال کنی ...';
      this.timeOut = setTimeout(()=>{
        this.textArea.nativeElement.placeholder = 'نظر شما ...';
      },4500)
    } else {
      this.disabledSend = true;
      if(this.moduleId !== "record"){
        this.commentService.sendComment(this.moduleId, commentValue, this.parentId, this.comment);
        this.textComment.setValue('');
        this.textArea.nativeElement.placeholder = 'لطفا منتظر بمانید ...';
        this.commentService.onSendMessage.subscribe(data=>{
          this.textArea.nativeElement.placeholder = 'نظر شما ...';
          this.disabledSend = false;
          if(data === 'sended'){
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 5000,
              timerProgressBar: true,
            })
            
            Toast.fire({
              icon: 'success',
              title: 'نظر شما دریافت شد و در لیست نظرات در انتظار تایید قرار گرفت...'
            })
          } else {
            this.textArea.nativeElement.placeholder = data;
            this.timeOut = setTimeout(()=>{
              this.textArea.nativeElement.placeholder = 'نظر شما ...';
            },4500)
          }
        })
      } else {
        // submit admin comment
        let userBpId = this.userBpId;
        let title = this.recordTitle.value;
        let text = this.textComment.value;
        let bp = businessPartner;
        let content = {
          "userID": userBpId,
          "title": title,
          "text": text,
          "bp": bp
        }        
        this.textArea.nativeElement.placeholder = 'لطفا منتظر بمانید ...';
        this.getUserData.sendAdminCommentToRecord(content).subscribe((res:any)=>{
          console.log(res, " ***res of send");
          this.textComment.setValue('');
          this.recordTitle.setValue('')
          this.textArea.nativeElement.placeholder = 'نظر شما ...';
          this.disabledSend = false;

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3500,
            timerProgressBar: true,
          })
          
          Toast.fire({
            icon: 'success',
            title: 'نظر شما دریافت شد ...'
          })
        },err=>{
          this.textComment.setValue('');
          this.recordTitle.setValue('')
          this.disabledSend = false;
          this.textArea.nativeElement.placeholder = err.error.error[0].message;
          setTimeout(()=>{
            this.textArea.nativeElement.placeholder = 'نظر شما ...';
          },4500)
        })
      }
 
    }
  }

  closeSendBox(){
    this.onCloseSendBox.emit('close')
  }
}
