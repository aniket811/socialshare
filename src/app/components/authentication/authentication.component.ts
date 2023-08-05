import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  isLoading:boolean=false;
  @ViewChild('LoginUser') LoginUser:any;
  constructor(private router:Router,private toast:ToastrService,private auth:FirebaseTSAuth,private authService:AuthServiceService) {}
  ngOnInit(){
  }
  onRegisterClick() {
    this.router.navigate(['/register']);
  }
  // Method for user to get logged  in if they have an account and email verified
  getUserLogin(userData:any) {
    this.isLoading=true;
    if(userData.email.trim().length==0||userData.password.trim().length==0){
      this.toast.error("Please enter all the fields","Error");
      return ;
    }
    this.auth.signInWith({
      email:userData.email,
      password:userData.password,
      onComplete:(user:any)=>{
        if(this.auth.getAuth().currentUser?.emailVerified){
          this.isLoading=false;
          this.authService.isUserLoggedIn.next(true);
          this.toast.success("Logged in successfully","Success");
          this.router.navigate(['/dashboard']);
          return ;
        }
        this.auth.sendVerificationEmail();
        this.toast.error("Please verify your email address and try login back","Error");
      },
      onFail:(error:any)=>{
        this.isLoading=false;
        this.toast.error("An error occured please check your credentials again","Error");
      }
      
  })
  }
  forgotPasswordEmailSend(){
      if(this.LoginUser.value.email.trim().length==0){
        this.toast.error("Please enter your email address","Error");
        this.isLoading=false;
        return ;
        
      }
      this.auth.sendPasswordResetEmail({
        email:this.LoginUser.value.email,
        onComplete:()=>{
          this.toast.success("Password reset link has been sent to your email address","Success");
          this.router.navigate(['/login']);
        }
      });
  }
}

     
  

