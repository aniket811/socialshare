import { Component } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFireStore/firebaseTSFireStore';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage';
import { v4 as uuid } from 'uuid';
import { FirebaseApp } from '@angular/fire/app';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css'],
})
export class CreatepostComponent {
  constructor(
    private firestore: FirebaseTSFirestore,
    private firebaseauth: FirebaseTSAuth,
    private toast: ToastrService,
    private storage: FirebaseTSStorage,
    private dialog:MatDialog
  ) {}
  selectedFile: any;
  onFileSelected(file: any) {
    this.selectedFile = file.files?.[0];
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
  uploadCaptionsOnly(img: any) {
    // let captions = img.value;
    // let userId: any = this.firebaseauth.getAuth().currentUser?.uid;
    // let postId = uuid();
    // let likes = 0;
    // this.firestore.create({
    //   path: ['posts', userId, postId],
    //   data: [captions, likes, this.selectedFile],
    //   onComplete: () => {
    //     this.toast.success('Post Uploaded Successfully');
    //   },
    //   onFail: () => {
    //     this.toast.error('Post Upload Failed! Try Again Later');
    //   },
    // });
    let userId: any = this.firebaseauth.getAuth().currentUser?.uid;
    let postId = uuid();
    this.firestore.create({
      path: ['Posts', postId],
      data: {
        postId: postId,
        creatorId: userId,
        captions: img,
        createdAt: FirebaseTSApp.getFirestoreTimestamp(),
        likes: 0,
        comments: 0,
      },
      onComplete: () => {
        this.toast.success('Post Uploaded Successfully');
        this.dialog.closeAll();
      },
      onFail: () => {
        this.toast.error('Post Upload Failed! Try Again Later');
        this.dialog.closeAll();
      }
    })
  }
  uploadImage(captions: HTMLTextAreaElement) {
    
    // let postId=uuid();
    // this.firestore.create({
    //   path:["posts",userId,postId],
    //   data:[postId,userId,this.selectedFile],
    //   onComplete:()=>{
    //     this.toast.success("Post Uploaded Successfully");
    //   },
    //   onFail:()=>{
    //     this.toast.error("Post Upload Failed! Try Again Later");
    //   }

    // })
    // Above code is redundant as we are using firebase storage to store images and firestore to store captions and likes
    let userId: any = this.firebaseauth.getAuth().currentUser?.uid;
    let postId = uuid();
    this.storage.upload({
      uploadName: 'Create a New Post ',
      path: ['Posts', "Image",postId, ],
      data:{

        data:this.selectedFile,
      } ,
      onComplete: () => {
        this.firestore.create({
          path: ['Posts', postId],
          data: {
            postId: postId,
            creatorId: userId,
            captions: captions,
            likes: 0,
            comments: 0,
            createdAt: FirebaseTSApp.getFirestoreTimestamp(),
          },
          onComplete: () => {
            this.toast.success('Post Uploaded Successfully');
            this.dialog.closeAll();
          },
          onFail: () => {
            this.dialog.closeAll();
            this.toast.error('Post Upload Failed! Try Again Later');
          },
        });
      },
    });
  }
  uploadPost(Captions: any) {
    if(!this.selectedFile){

      Captions.trim().length<=0?(
        this.toast.error("Please Enter some text to post")

      )
      :(this.uploadCaptionsOnly(Captions));
    }
    this.uploadImage(Captions);
    //  this.uploadImage();
  }
}
