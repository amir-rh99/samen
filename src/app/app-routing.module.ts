import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { ServicesComponent } from './pages/services/services.component';
import { RegisterComponent } from './pages/register/register.component';
import { LostPasswordComponent } from './pages/lost-password/lost-password.component';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './services/auth-guard.service';
import { AfterLoginGuard } from './services/after-login-guard.service';

const routes: Routes = [
  {
    path: '' ,
    component: LandingComponent,
    canActivate:[AfterLoginGuard]
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate:[AfterLoginGuard],

    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'lost-password',
        component: LostPasswordComponent
      }
    ]
  },
  {
    path: 'home',
    component: AuthComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
        children: [
          {
            path: '',
            component: ServicesComponent
          }
        ]
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
