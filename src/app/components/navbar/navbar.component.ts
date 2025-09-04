import { Component, OnInit, Sanitizer } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFireStore/firebaseTSFireStore';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Renderer2 } from '@angular/core'
import { MatMenuModule } from '@angular/material/menu';
import { EncryptStorage } from 'encrypt-storage';
import { authenticationGuard } from 'src/app/guards/authentication.guard';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  profileImageUrl: string = "../../../assets/No-Instagram-Profile-Pic-removebg-preview.png"
  encryptionService = new EncryptStorage('U2FsdGVkX1/2KEwOH+w4QaIcyq5521ZXB5pqw', {
    storageType: 'localStorage'
  })
  profileUrl:String|SafeResourceUrl= "" ;
  isUserLoggedIn: boolean = false;
  displayName: string = 'Guest';
  isUserProfileExist: boolean = false;
  constructor(private auth: AuthServiceService, private renderer: Renderer2, private authService: FirebaseTSAuth, private router: Router, private authUserService: AuthServiceService, private firestore: FirebaseTSFirestore, private sanitizer:DomSanitizer) { }
  ngOnInit(): void {
    this.isLoggedIn();
  }

  logout() {
    this.authService.signOut({
      onComplete: () => {
        this.authUserService.isUserLoggedIn.next(false);
        sessionStorage.removeItem('socialShare');
        this.router.navigateByUrl("/login")

      }
    })
  }

  isLoggedIn(): boolean {

    this.authUserService.isUserLoggedIn.subscribe((value) => {
      this.isUserLoggedIn = value;
      if (this.isUserLoggedIn) {
        this.firestore.getDocument({
          path: ['profile', this.authService.getAuth().currentUser?.uid!],
          onComplete: (data: any) => {
            if (data.exists) {

              let userName = data._delegate._document.data.value.mapValue.fields.data.stringValue;
              this.authUserService.UserProfileName.next(userName)
              this.authUserService.UserProfileName.subscribe((name: any) => {
                this.displayName = name;
              })
              this.setDisplayName(this.displayName); 
             
            }

          }
        })
      }

    })
    return this.isUserLoggedIn;
  }

  setDisplayName(displayName: any): any {
    if (displayName.trim() !== '') {
      let userId: any = FirebaseTSApp.getAuth().currentUser?.uid;
      this.getCurrentUserProfile(userId); 
      this.authUserService.isUserProfileExists.next(false);
    }
    else {
      this.authUserService.isUserProfileExists.next(true);
    }
  }
  reloadApp() {

    window.location.reload();
  }
    getCurrentUserProfile(userId: string) {
  try {
    const storage = getStorage();
    const fileRef = ref(storage, `profile/images/${userId}`);
    const url = setTimeout(() => {
      getDownloadURL(fileRef).then((url:any)=>{
        this.profileUrl = this.sanitizer.bypassSecurityTrustUrl(url);
        console.log(this.profileUrl);
     
      }).catch((ex:any)=>{
        
      });
    }, 2500);
    return url;
  } catch (error) {
    console.error("Error getting profile image URL:", error);
    return null;
  }
}
onProfileClick(event: Event) {
}
} 
