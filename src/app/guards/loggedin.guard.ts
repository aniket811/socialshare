import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { EncryptStorage } from 'encrypt-storage';

@Injectable({
  providedIn: 'root'
})
export class loggedin implements CanActivate {
  constructor(private auths: FirebaseTSAuth,
    private authService: AuthServiceService,
    private toast: ToastrService,
    private router: Router
  ) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    let  isLoggedInSuccessful =false;
    const userCredsString = sessionStorage.getItem('socialShare');
    const parsedUserCreds = userCredsString ? JSON.parse(userCredsString) : null;
    if (parsedUserCreds != null) {
      this.auths.signInWith(({
        email: parsedUserCreds.email,
        password: parsedUserCreds.password,
        onComplete: () => {
          this.authService.isUserLoggedIn.next(true);
          this.toast.success("Logged in successfully", "Success");
          isLoggedInSuccessful=true;

        },
        onFail: (error: any) => {
          this.toast.error("An error occured please login again!");
          isLoggedInSuccessful=false;
          
        }
      })
      )
      return isLoggedInSuccessful;

    }
    // if (this.authService.isUserLoggedIn.value == true) {
    //   return true;
    // }
    if (this.authService.isUserLoggedIn.value == true) {
  
      return false;
    }
    else return false;
  }
}