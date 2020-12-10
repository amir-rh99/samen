
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common'
import { provideRoutes, RouterState } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
  UsersComponent,
  EditUserComponent,
  BusinessPartnerComponent,
  AuthComponent,
  EnrollComponent,
  HomeComponent,
  LandingComponent,
  LoginComponent,
  LostPasswordComponent,
  NotFoundComponent,
  ProfileComponent,
  RegisterComponent,
  ResultComponent,
  ServicesComponent,
  TestRunnerComponent
} from './pages'

import {
  UserInfoComponent,
  ChangeAvatarComponent,
  ChangeInfoComponent,
  ChangePasswordComponent,
  BtnLoadingComponent,
  BreadcrumbComponent,
  CommentsComponent,
  DialogComponent,
  FooterComponent,
  LoadingComponent,
  MobileSidebarComponent,
  SidebarComponent,
  NavbarComponent,
  NotificationsComponent,
} from './components'

import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [
    //pages
    UsersComponent,
    EditUserComponent,
    BusinessPartnerComponent,
    AuthComponent,
    EnrollComponent,
    HomeComponent,
    LandingComponent,
    LoginComponent,
    LostPasswordComponent,
    NotFoundComponent,
    ProfileComponent,
    RegisterComponent,
    ResultComponent,
    ServicesComponent,
    TestRunnerComponent,

    // components
   UserInfoComponent,
   ChangeAvatarComponent,
   ChangeInfoComponent,
   ChangePasswordComponent,
   BtnLoadingComponent,
   BreadcrumbComponent,
   CommentsComponent,
   DialogComponent,
   FooterComponent,
   LoadingComponent,
   MobileSidebarComponent,
   SidebarComponent,
   NavbarComponent,
   NotificationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
     ReactiveFormsModule,
     NgbModule,
     BrowserAnimationsModule,
     MatIconModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    NavbarComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


