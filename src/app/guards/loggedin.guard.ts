import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { EncryptStorage } from 'encrypt-storage';

@Injectable({
  providedIn:'root'
}) 
export class loggedin implements CanActivate{
  encryptionService=new EncryptStorage('U2FsdGVkX1/2KEwOH+w4QaIcyq5521ZXB5pqw');
  constructor(private auths:FirebaseTSAuth,
      private authService:AuthServiceService,
    private toast:ToastrService,
    private router:Router
    ){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
   
      const userCreds = this.encryptionService.getItem('encryptedData',false);
      if(userCreds!=null){
        this.auths.signInWith(({
          email:userCreds.email,
          password:userCreds.password,
          onComplete:()=>{
            this.authService.isUserLoggedIn.next(true);
            this.toast.success("Logged in successfully", "Success");
            this.router.navigate(['/dashboard']);
          },
          onFail:(error:any)=>{
            this.toast.error("An error occured please login again!")
            return false;
          }
        }))
      }
      return true;
    }
}