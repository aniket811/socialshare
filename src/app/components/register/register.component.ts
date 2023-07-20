import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    @ViewChild('RegisterUser') RegisterUser:any;
    isRegistering:boolean=false;
    isFormValid():boolean{
      if(this.RegisterUser.valid){
        return false;
      }
      return false;
    }
  constructor(private router:Router,private auth:FirebaseTSAuth,private toast:ToastrService) {}
  onLoginClick() {
    this.router.navigate(['/login']);
  }
  public getErrorMessage(message:any){
    this.toast.error(message,"Error");
  }
  getUserRegistered(event:any) {
    this.isRegistering=true;
    if(event.password.trim().length<0||event.password.trim().length<0){
      this.toast.error("Required Field is Missiog","Error");
      return;
    }
    //(event);
    this.auth.createAccountWith({
      email:event.email,
      password:event.password,
      onComplete:(user:any)=>{
        this.auth.sendVerificationEmail();
        this.isRegistering=false;
        this.toast.success("Email verification link has been sent to your Email address","Success");
        this.router.navigate(['/login']);
        
      },
      onFail:(error:any)=>{
        this.isRegistering=false;
        this.toast.error(error,"Error");
      }
    })
  
  }
  
}
