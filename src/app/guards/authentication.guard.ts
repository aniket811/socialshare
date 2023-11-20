import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
// // import { CanActivateFn } from '@angular/router';
// import { CanActivate } from '@angular/router';
// export const authenticationGuard implements CanActivate{
//     CanActivate():boolean{

//     }
// };

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';
// We Will use this to check if the user is signed in or not if not we will redirect him to the login page else we will let him go to the page he wants to go to
@Injectable({
  providedIn: 'root'
})
export class authenticationGuard implements CanActivate {
  constructor(private authService: FirebaseTSAuth,
    private router: Router,
    private auths:AuthServiceService
    ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    debugger;
    if (this.authService.isSignedIn()) {
      if (this.authService.isEmailVerified()) {
        this.auths.isUserLoggedIn.next(true);
        return true;
      } else {
        this.router.navigateByUrl('/login');
        return false;
      }
    }
    else if (sessionStorage.getItem('socialShare') != null) {
      let socialShareCookie = JSON.parse(sessionStorage.getItem('socialShare') ?? '');
      this.authService.signInWith({
        email: socialShareCookie.email,
        password: socialShareCookie.password,
        onComplete: () => {
          this.auths.isUserLoggedIn.next(true);
          this.router.navigateByUrl('/dashboard');
          return true;
        },
        onFail: (error: any) => {
          this.router.navigateByUrl('/login');
          return false;
        }
      });
      return false;

    }
    this.router.navigateByUrl('/login');
    return false;
  }
}

//  let isUserLoggedIn:boolean=false;
//   if(this.authService.isSignedIn()){
//     if(this.authService.isEmailVerified()){
//       // isUserLoggedIn=true;
//       return isUserLoggedIn;
//     }
//     else{
//       this.router.navigateByUrl('/login');
//       return false;
//     }
//   }
//   return false;


