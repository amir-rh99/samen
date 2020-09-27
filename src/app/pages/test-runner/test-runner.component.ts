import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetServicesService } from 'src/app/services/get-services.service';
import { GeuUserDataService } from 'src/app/services/geu-user-data.service';

import { FormBuilder, Validators } from '@angular/forms'
import { PostServicesService } from 'src/app/services/post-services.service';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { NavbarServiceService } from 'src/app/services/navbar-service.service';

@Component({
  selector: 'app-test-runner',
  templateUrl: './test-runner.component.html',
  styleUrls: ['./test-runner.component.scss']
})

export class TestRunnerComponent implements OnInit {
  moduleName;
  userId;
  enrollId;
  questions;
  questionId;
  choices;
  total;
  answers = [];
  percent;
  disable = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private getServices: GetServicesService,
    private getUserData: GeuUserDataService,
    private formbuilder: FormBuilder,
    private postServices: PostServicesService,
    private navbarService: NavbarServiceService,
    private route: Router
  ) { 

  }

  questionsForm = this.formbuilder.group({
    choice: ['',[Validators.required]]
  });


  ngOnInit(): void {
    this.navbarService.setTestRunnerState(false);
    this.userId = localStorage.getItem('id');
    this.activatedRoute.paramMap.subscribe(param=>{
      this.moduleName = param.get('moduleName');
      this.getServices.getSpecificService(this.moduleName).subscribe((service:any)=>{
        this.getUserData.getUserEnrollforService(this.userId, service.id).subscribe((Res:any)=>{
          this.enrollId = +Res.enrolls[Res.enrolls.length - 1].id;
          console.log(Res);
          console.log(this.enrollId);
          
          if(localStorage.getItem(this.enrollId)){
            //////////
            let exist = JSON.parse(localStorage.getItem(this.enrollId));
            this.questionId = exist.length + 1;
          } else {
            localStorage.setItem(this.enrollId, '[]');
            this.questionId = 1;
            this.percent = 0.5;
          }
          this.getServices.getFullStructure(this.moduleName).subscribe((questions:any)=>{
            this.questions = questions;
            this.choices = this.questions.questions[this.questionId].choices;
            this.total = Object.keys(this.questions.questions).length;
            console.log(this.choices);
            this.percent = ((this.questionId)/(this.total)*100);
            console.log(this.questions);

          })
          
        })
      })
    })


  }

  nextQuestion(){
    this.answers = eval(localStorage.getItem(this.enrollId.toString()));
    let answer = {
      "s": this.questionId.toString(),
      "q": this.questions.questions[this.questionId].question.id,
      "a": this.questionsForm.value.choice
    }
    this.answers.push(answer);
    localStorage.setItem(this.enrollId.toString(),JSON.stringify(this.answers))
    console.log(this.answers);
    if(this.questionId === 5) {
      this.disable = false
    }
    if(this.questionId < this.total){
      this.questionId++;
      this.percent = ((this.questionId)/(this.total)*100);
      this.questionsForm.reset();
    } else {
      this.postServices.answerToAssessments(this.enrollId,this.moduleName,this.answers).subscribe(Res=>{
        console.log(Res, ' post completed');
        this.route.navigateByUrl(`${this.moduleName}/result`)
      })
    }
  }

}
