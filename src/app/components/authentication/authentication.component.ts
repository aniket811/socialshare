import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Auth } from 'firebase/auth'
import { LocalStorageService } from 'ngx-webstorage'
import { EncryptStorage } from 'encrypt-storage';
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  isLoading: boolean = false;
  isShowPasswordChecked:boolean=false;
  showPasswordInput:string="password";

  isRememberMeChecked:boolean=false;
  // securels=new SecureLS({encodingType:'aes',isCompression:false})/;
  @ViewChild('LoginUser') LoginUser: any;
  constructor(private router: Router, private toast: ToastrService,
    private auths: FirebaseTSAuth, private oauthService: AngularFireAuth,
    // private googleAuthService:Auth,
    private storage: LocalStorageService,

    private authService: AuthServiceService) { }
 
  ngOnInit() {
    if(sessionStorage.getItem('socialShare')!=null){
      const socialShareData=JSON.parse(sessionStorage.getItem('socialShare')!);
      this.LoginUser.controls.email.setValue(socialShareData.email);
      this.LoginUser.controls.password.setValue(socialShareData.password);
      this.auths.signInWith({
        email: socialShareData.email,
        password: socialShareData.password,
        onComplete: (user: any) => {
          if (this.auths.getAuth().currentUser?.emailVerified) {
            this.isLoading = false;
            this.authService.isUserLoggedIn.next(true);
            this.toast.success("Logged in successfully", "Success");
            this.router.navigate(['/dashboard']);
            return;
          }
          this.auths.sendVerificationEmail();
          this.toast.error("Please verify your email address and try login back", "Error");
          this.isLoading = false;
        }        
      })
    }
    return; 
  }
  
 
  
  RememberMe(data:any){
    this.isRememberMeChecked=data.target.checked;
   
  }
  onRegisterClick() {
    this.router.navigate(['/register']);
  }
  storeData(data: any) {
    this.storage.store('userLogin', data);
  }

  // Method for user to get logged  in if they have an account and email verified
  getUserLogin(userData: any) {
      
    this.isLoading = true;
    if (userData.email.trim().length == 0 || userData.password.trim().length == 0) {
      this.toast.error("Please enter all the fields", "Error");
      this.isLoading = false;
      return;
    }
    this.auths.signInWith({
      email: userData.email,
      password: userData.password,
      onComplete: (user: any) => {
        if (this.auths.getAuth().currentUser?.emailVerified) {
          this.isLoading = false;
          this.authService.isUserLoggedIn.next(true);
          this.toast.success("Logged in successfully", "Success");
          if(this.isRememberMeChecked){
            const loginData={
              email:userData.email,
              password:userData.password
            }
            sessionStorage.setItem('socialShare',JSON.stringify(loginData));
          }
          this.router.navigate(['/dashboard']);
          return;
        }
        this.auths.sendVerificationEmail();
        this.toast.error("Please verify your email address and try login back", "Error");
        this.isLoading = false;
      },
      onFail: (error: any) => {
        this.isLoading = false;
        this.toast.error("An error occured please check your credentials again", "Error");
      }

    })
  }
  forgotPasswordEmailSend() {
    if (this.LoginUser.value.email.trim().length == 0) {
      this.toast.error("Please enter your email address", "Error");
      this.isLoading = false;
      return;

    }
    this.auths.sendPasswordResetEmail({
      email: this.LoginUser.value.email,
      onComplete: () => {
        this.toast.success("Password reset link has been sent to your email address", "Success");
        this.router.navigate(['/login']);
      }
      
    }
    );
  }
 showPassword(val:any,passwordInputType:any){

    passwordInputType=="password"?(
    this.isShowPasswordChecked=true,
    this.showPasswordInput="text"):(
        this.isShowPasswordChecked=false
      ,this.showPasswordInput="password");
 }
}




