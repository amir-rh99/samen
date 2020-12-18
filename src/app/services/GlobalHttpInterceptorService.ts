import {
  Injectable
} from '@angular/core'
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import {
  Observable,
  of ,
  throwError
} from "rxjs";
import {
  catchError,
  map
} from 'rxjs/operators';
import {
  Router
} from '@angular/router';
import Swal from 'sweetalert2';
import {
  NavbarServiceService
} from './navbar-service.service';
import { NavbarComponent } from '../components/navbar/navbar.component';

@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
    private navbarService: NavbarServiceService,
    private navbarComponent: NavbarComponent
  ) {

  }
  intercept(req: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            // console.error("Error Event");
          } else {
            // console.log(`error status : ${error.status} ${error.statusText}`);
            switch (error.status) {
              case 401: //login
                this.UnauthorizedLogOut();
                this.router.navigateByUrl("/auth/login");
                break;
              case 403: //forbidden
                this.UnauthorizedLogOut();
                this.router.navigateByUrl("/auth/login");
                break;
                case 404: 
                this.router.navigateByUrl("/not-found")
            }
          }
        } else {
        //   console.error("some thing else happened");
        }
        return throwError(error);

      })
    )
  }
  UnauthorizedLogOut() {
    // Swal.fire({
    //   icon: 'error',
    //   title: 'دسترسی شما به این بخش ممکن نیست',
    //   text: 'لطفا دوباره وارد شوید',
    // })
    let items = ['hash', 'id', 'lastLogin', 'role', 'newLogin', 'day', 'nickname'];
    items.forEach(item => {
      localStorage.removeItem(item);
    })
    this.navbarComponent.loggedIn = false;
    this.navbarService.setNavbarState(false);
  }
}
