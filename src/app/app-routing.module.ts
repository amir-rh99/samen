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
import { EnrollComponent } from './pages/enroll/enroll.component';
import { TestRunnerComponent } from './pages/test-runner/test-runner.component';
import { ResultComponent } from './pages/result/result.component';
import { UsersComponent } from './pages/users/users.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { BusinessPartnerComponent } from './pages';

const routes: Routes = [
  {
    path: '' ,
    component: LandingComponent,
    canActivate:[AfterLoginGuard],

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
    path:'business-partner',
    component: BusinessPartnerComponent
  },
  {
    path: '',
    component: AuthComponent,
    canActivate:[AuthGuard],

    children: [
      {
        path: 'home',
        component: ServicesComponent
      },
      {
        path: ':moduleName',
        component: EnrollComponent
      },
      {
        path: ':moduleName/result',
        component: ResultComponent
      },
      {
        path: 'users/:userId',
        component: UsersComponent,
        children: [
          {
            path: 'profile',
            component: ProfileComponent
          },
          {
            path: 'edit',
            component: EditUserComponent
          }
        ]
      },

    ]
  },

  {
    path: ':moduleName/step',
    component: TestRunnerComponent,
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
