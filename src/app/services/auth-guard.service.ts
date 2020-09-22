import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2'


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(
    private auth: AuthService,
    private route: Router
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    return this.auth.isAuthenticated().then(
      (auth: boolean) =>{
        if(auth){
          return true
        } else {
          Swal.fire({
            icon: 'error',
            title: 'اجازه ورود ندارید!',
            text: 'برای دسترسی به این بخش ابتدا وارد شوید',
          })
          this.route.navigateByUrl('/auth/login')
          return false
        }
      }
    )
  }
}
