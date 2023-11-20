import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFireStore/firebaseTSFireStore';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Renderer2 } from '@angular/core'
import { MatMenuModule } from '@angular/material/menu';
import { EncryptStorage } from 'encrypt-storage';
import { authenticationGuard } from 'src/app/guards/authentication.guard';
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

  isUserLoggedIn: boolean = false;
  displayName: string = 'Guest';
  isUserProfileExist: boolean = false;
  constructor(private auth: AuthServiceService, private renderer: Renderer2, private authService: FirebaseTSAuth, private router: Router, private authUserService: AuthServiceService, private firestore: FirebaseTSFirestore) { }
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
      this.authUserService.isUserProfileExists.next(false);
    }
    else {

      this.authUserService.isUserProfileExists.next(true);
    }
  }
  reloadApp() {

    window.location.reload();
  }
  
} 
