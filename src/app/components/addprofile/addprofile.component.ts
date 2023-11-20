import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFireStore/firebaseTSFireStore';
import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ImageService } from 'src/app/services/image.service';
import { v4 as uuid } from 'uuid'
@Component({
  selector: 'app-addprofile',
  templateUrl: './addprofile.component.html',
  styleUrls: ['./addprofile.component.css']
})
export class AddprofileComponent implements OnInit {
  encodeImage: string | undefined;
  isProfileUploaded: boolean | undefined;
  ngOnInit(): void {
  }
  constructor(
    private imageService: ImageService,
    private toast: ToastrService,
    private firestore: FirebaseTSFirestore,
    private firestorage: FirebaseTSStorage,
    private dialog: MatDialog,
    private authService: AuthServiceService
  ) { }


  imageUpload(uploadImage: HTMLInputElement): void {
    let isUsernameExist: boolean;
    let downloadUrls: string | undefined;

    let userId: any = FirebaseTSApp.getAuth().currentUser?.uid;
    let profileImage = uploadImage.files?.item(0);
    if (!profileImage) {
      this.toast.error('Please select an image');
      return ;
    }
    const reader = new FileReader();
    reader.readAsDataURL(profileImage);
    
    this.firestorage.upload({
      uploadName: 'Profile Upload',
      path: ['profile', 'images', userId],
      data: {
        data: profileImage

      },
      onComplete: (downloadUrl: any) => {
        this.isProfileUploaded = true;
        
        this.toast.success('Profile Image Uploaded Successfully');
        // Checking if the username is registered for a given user 
        this.firestore.getDocument({
          path: ['profile', userId],
          onComplete: (data: any) => {
            isUsernameExist=data.exists;
            if (!isUsernameExist) {
              this.firestore.create({
                path: ['profile', userId],
                data: {
                  imageUrl: downloadUrl
                },
                onComplete: (data) => {
                  
                },
                onFail: (error: any) => {
                },
              })
            }
            else {
              this.firestore.update({
                path: ['profile', userId],
                data: {
                  imageUrl: downloadUrl
                },
                onComplete: (data) => {
                  
                },
                onFail(error: any) {
                },
              })
            }
          },
          onFail: (error: any) => {
            this.toast.error(error);
          }
        })

        this.dialog.closeAll();

      },
      onFail: (error: any) => {
        this.isProfileUploaded = false;
        this.toast.error(error);
      },

    })
    // Redundant code needs to have discussions on this with  a product team
  

  }

  ngOnChanges(): void {

  }
}
