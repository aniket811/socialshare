import { MatIconModule } from '@angular/material/icon';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ErrorHandler, NgModule } from '@angular/core';
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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
// import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
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
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ToastrModule.forRoot({
      preventDuplicates:true
    }),
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule
  ],
  providers: [FirebaseTSApp.init(environment.firebaseConfig),FirebaseTSAuth,provideAnimations(),provideToastr({
    preventDuplicates:true,
    closeButton:true,
    positionClass:"toast-top-right",
  }),ToastrService,FirebaseTSFirestore,
  FirebaseTSStorage
],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){
    AngularFireModule.initializeApp(environment.firebaseConfig)
  }

}

