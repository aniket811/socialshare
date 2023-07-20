import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  constructor(private router:Router,private toast:ToastrService,private auth:FirebaseTSAuth) {}
  ngOnInit(){


  }
  onRegisterClick() {
    this.router.navigate(['/register']);
  }
  // Method for user to get logged  in if they have an account and email verified
  getUserLogin(userData:any) {

    if(userData.email.trim().length==0||userData.password.trim().length==0){
      this.toast.error("Please enter all the fields","Error");
      return ;
    }
    this.auth.signInWith({
      email:userData.email,
      password:userData.password,
      onComplete:(user:any)=>{
        if(this.auth.getAuth().currentUser?.emailVerified){
          this.router.navigate(['/dashboard']);
          return ;
        }
        this.toast.error("Please verify your email address","Error");
        this.auth.sendVerificationEmail();
        this.router.navigate(['/verifyemail']);
      },
      onFail:(error:any)=>{
        this.toast.error("An error occured please check your credentials again","Error");
      }
      
  })
  }
}

     
  

