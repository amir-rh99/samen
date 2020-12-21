
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common'
import { provideRoutes, RouterState } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {NgxTypedJsModule} from 'ngx-typed-js';


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
import {MatMenuModule} from '@angular/material/menu';

// lyTheme fo cropper image
import { LyImageCropperModule } from '@alyle/ui/image-cropper';
import {
  HAMMER_GESTURE_CONFIG,
  HammerModule
} from '@angular/platform-browser';
import {
  LyTheme2,
  StyleRenderer,
  LY_THEME,
  LY_THEME_NAME,
  LyHammerGestureConfig
} from '@alyle/ui';
import { MinimaLight, MinimaDark } from '@alyle/ui/themes/minima';


//////// prime ng
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import { GlobalHttpInterceptorService } from './services/GlobalHttpInterceptorService';
import {InputTextModule} from 'primeng/inputtext';
import { SendCommentComponent } from './components/comments/send-comment/send-comment.component';
import { CommentBoxComponent } from './components/comments/comment-box/comment-box.component';


@NgModule({
  declarations: [
    //pages
    AppComponent,
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
   SendCommentComponent,
   CommentBoxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatIconModule,
    HammerModule,
    LyImageCropperModule,
    TableModule,
    MatMenuModule,
    TooltipModule,
    NgxTypedJsModule,
    InputTextModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,    useClass: GlobalHttpInterceptorService,    multi: true  },
    // { provide: ErrorHandler, useClass:GlobalErrorHandlerService}
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    NavbarComponent,
    [ LyTheme2 ],
    [ StyleRenderer ],
    // Theme that will be applied to this module
    { provide: LY_THEME_NAME, useValue: 'minima-light' },
    { provide: LY_THEME, useClass: MinimaLight, multi: true }, // name: `minima-light`
    { provide: LY_THEME, useClass: MinimaDark, multi: true }, // name: `minima-dark`
    // Gestures
    { provide: HAMMER_GESTURE_CONFIG, useClass: LyHammerGestureConfig }
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


