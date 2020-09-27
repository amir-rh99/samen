
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ServicesComponent } from './pages/services/services.component';
import { LostPasswordComponent } from './pages/lost-password/lost-password.component';
import { AuthComponent } from './pages/auth/auth.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { HomeComponent } from './pages/home/home.component';
import { LoadingComponent } from './components/loading/loading.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common'
import { provideRoutes, RouterState } from '@angular/router';
import { MobileSidebarComponent } from './components/mobile-sidebar/mobile-sidebar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { EnrollComponent } from './pages/enroll/enroll.component';
import { TestRunnerComponent } from './pages/test-runner/test-runner.component';
import { ResultComponent } from './pages/result/result.component';
import { CommentsComponent } from './components/comments/comments.component';
import { NotificationsComponent } from './components/notifications/notifications.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    SidebarComponent,
    ServicesComponent,
    LostPasswordComponent,
    AuthComponent,
    BreadcrumbComponent,
    DialogComponent,
    HomeComponent,
    LoadingComponent,
    MobileSidebarComponent,
    EnrollComponent,
    TestRunnerComponent,
    ResultComponent,
    CommentsComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
     ReactiveFormsModule,
     NgbModule,
     BrowserAnimationsModule
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


