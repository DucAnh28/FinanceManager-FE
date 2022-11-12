import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {AccountService} from "../account/service/account.service";


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  currentUser: any;

  constructor(
    private router: Router,
    private accountService : AccountService
  ) {
    this.accountService.currentUser.subscribe(
      currentUser => {
        this.currentUser = currentUser;
      }
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.currentUser) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.currentUser) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

  canLoad(route: Route, segments: UrlSegment[]) {
    return true;
  }
}
