
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
import { provideRoutes } from '@angular/router';
import { MobileSidebarComponent } from './components/mobile-sidebar/mobile-sidebar.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


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
    MobileSidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
     ReactiveFormsModule,
     NgbModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    NavbarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
