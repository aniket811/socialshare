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

@Injectable({
  providedIn: 'root'
})
export class authenticationGuard implements CanActivate {
  constructor(private authService:FirebaseTSAuth,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if(this.authService.isSignedIn()){
      // This code can be removed it is just for a patch to fix the bug 
      if(this.authService.isEmailVerified()){
        return true;
      }

    }
    this.router.navigateByUrl('/');
    return false;
  } 
  
}
