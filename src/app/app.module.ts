import { MatIconModule } from '@angular/material/icon';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {MatButtonModule} from '@angular/material/button'; 
import { AppComponent } from './app.component';
import { AuthenticationComponent } from '../app/components/authentication/authentication.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostsComponent } from './components/dashboard/posts/posts.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import {FirebaseTSApp} from "firebasets/firebasetsApp/firebaseTSApp"
 import {FirebaseTSAuth} from "firebasets/firebasetsAuth/firebaseTSAuth"
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { ToastrModule, ToastrService, provideToastr } from 'ngx-toastr';
import { CreatepostComponent } from './components/createpost/createpost.component';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFireStore/firebaseTSFireStore';
import { MatDialogModule } from '@angular/material/dialog';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { SocialLoginModule, SocialAuthServiceConfig, SocialAuthService } from 'angularx-social-login';
import {
  GoogleLoginProvider
} from 'angularx-social-login';
// import {loc}
// import { AslGoogleSigninButtonComponent } from 'angularx-social-login/providers/google-login-provider';
// import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
// import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'
import { MatCardModule } from '@angular/material/card';
import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerComponent } from './components/spinner/spinner.component'
import { LocalStorageService } from 'ngx-webstorage';
import { loggedin } from './guards/loggedin.guard';
@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    NavbarComponent,
    DashboardComponent,
    PostsComponent,
    HomeComponent,
    RegisterComponent,
    CreatepostComponent,
    ProfileComponent,
    SpinnerComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    SocialLoginModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ToastrModule.forRoot({
      preventDuplicates:true
    }),
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    GoogleSigninButtonModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule
  ],
  providers: [FirebaseTSApp.init(environment.firebaseConfig),FirebaseTSAuth,provideAnimations(),provideToastr({
    preventDuplicates:true,
    closeButton:true,
    positionClass:"toast-top-right",
  }),ToastrService,FirebaseTSFirestore,
  FirebaseTSStorage,
  {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            environment.google
          )
        }
      ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  },
  SocialAuthService,
  LocalStorageService,
  loggedin
],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){
    AngularFireModule.initializeApp(environment.firebaseConfig)
  }

}

