import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFireStore/firebaseTSFireStore';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage';
import { v4 as uuid } from 'uuid';
import { FirebaseApp } from '@angular/fire/app';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { MatDialog } from '@angular/material/dialog';
import { AuthServiceService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css'],
})
export class CreatepostComponent implements OnInit {
  selectedFile: any;
  userName:string='';
  
    userId:any=this.firebaseauth.getAuth().currentUser?.uid;
  constructor(
    private firestore: FirebaseTSFirestore,
    private firebaseauth: FirebaseTSAuth,
    private toast: ToastrService,
    private storage: FirebaseTSStorage,
    private dialog: MatDialog,
    private authService:AuthServiceService
  ) {   
    this.authService.UserProfileName.subscribe((profileName:any)=>{
      console.log(profileName);
      this.userName=profileName
    })}
  ngOnInit():void{
  
  }
  onFileSelected(file: HTMLInputElement) {
    this.selectedFile = file.files?.item(0);
    if (!this.selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.addEventListener('loadend', (event: any) => {
      let readableString = reader.result?.toString();
      let postPreviewImage = <HTMLImageElement>(
        document.getElementById('post-preview-image')
      );
      postPreviewImage.src = readableString as string;
    });
  }
  // uploadCaptionsOnly(img: any) {
  //   let userId: any = this.firebaseauth.getAuth().currentUser?.uid;
  //   let postId = uuid();
  //   this.firestore.create({
  //     path: ['Posts', postId],
  //     data: {
  //       postId: postId,
  //       creatorId: userId,
  //       captions: img,
  //       createdAt: FirebaseTSApp.getFirestoreTimestamp(),
  //       likes: 0,
  //       comments: 0,
  //     },
  //     onComplete: () => {
  //       this.toast.success('Post Uploaded Successfully');
  //       this.dialog.closeAll();
  //     },
  //     onFail: () => {
  //       this.toast.error('Post Upload Failed! Try Again Later');
  //       this.dialog.closeAll();
  //     }
  //   })
  // }
  uploadCaptionOnly(captions:any){
    
    this.toast.info('Uploading post please wait...')
    let postId=uuid();
    this.firestore.create({
      path:['Posts',postId],
      data:{
        captions:captions,
        creatorId:this.userId,
        postId:postId,
        createdAt:FirebaseTSApp.getFirestoreTimestamp(),
        creatorName:this.userName[0],
        likes:0,
        comments:0
      },
      onComplete:()=>{
        this.toast.success('Post Uploaded Successfully');
        this.dialog.closeAll();
      },
      onFail:()=>{
        this.dialog.closeAll();
        this.toast.error('Post Upload Failed! Try Again Later');
      }
  })
  }
  uploadImage(captions: HTMLTextAreaElement) {
    this.dialog.closeAll();
    this.toast.info('Uploading post please wait...')
    // Above code is redundant as we are using firebase storage to store images and firestore to store captions and likes
    let userId: any = this.firebaseauth.getAuth().currentUser?.uid;
    let postId = uuid();
    this.storage.upload({
      uploadName: 'Create a New Post ',
      path: ['Posts', "Image", postId],
      data: {

        data: this.selectedFile,
      },
      onComplete: (data:any) => {
        this.firestore.create({
          path: ['Posts', postId],
          data: {
            creatorName:this.userName,
            postId: postId,
            ImageUrl:data,
            creatorId: userId,
            userName:this.userName,
            captions: captions,
            likes: 0,
            comments: 0,
            profileurl:this.firestore.getDocument({
              path:['profile',this.userId],
              onComplete:(data:any)=>{
                return data.profileurl
              },
              onFail:()=>{
                return null;
              }
            }) ,           
            createdAt: FirebaseTSApp.getFirestoreTimestamp(),
          },
          onComplete: () => {
            this.toast.success('Post Uploaded Successfully');

         
          },
          onFail: () => {
            this.toast.error('Post Upload Failed! Try Again Later');
          },
        });
      },
    });
  }
  uploadPost(Captions: any) {
    let captions=Captions

    if (!this.selectedFile) {
      if(captions.trim().length == 0 )
      {
        this.toast.error("Please Enter some text to post")
        return; 
      }
      else{
        this.uploadCaptionOnly(Captions);
        return ; 
      }
    }
    this.uploadImage(Captions);
    return;
  }

}
