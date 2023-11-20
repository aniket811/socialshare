import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFireStore/firebaseTSFireStore';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../services/auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { AddprofileComponent } from '../components/addprofile/addprofile.component';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  implements OnInit{
  @ViewChild('profile') profile:any;
  isProfileExistsClass:boolean|undefined;
  profileimageUrl:string="../../assets/No-Instagram-Profile-Pic-removebg-preview.png";
  inputType:string="image";
  constructor(
    private dialog:MatDialog,
    private router:Router,
    private firestore:FirebaseTSFirestore,
    private authService:FirebaseTSAuth,
    private toast:ToastrService,
    private auths:AuthServiceService,
    private imageService:ImageService
    ) { }
  ngOnInit(): void {
      this.alreadyProfileImage();
  }
  addProfile(name:any){
    this.firestore.create({
      path:["profile",this.authService.getAuth().currentUser?.uid!],
      data:{
        data:name
      },
      onComplete:(data:any)=>{
        this.auths.isUserProfileExists.next(true);
        this.toast.success("Profile Created Successfully");
        this.auths.UserProfileName.next(name);  
      },

    })
  }

  openProfileInput(){


    this.dialog.open(AddprofileComponent,{
   hasBackdrop:true,
   disableClose:false ,
   height:'7rem',
   panelClass:'profile-input',
    });
    this.dialog.afterAllClosed.subscribe((data:any)=>{
      this.firestore.getDocument({
        path:["profile",this.authService.getAuth().currentUser?.uid!],
        onComplete:(data:any)=>{
          if(data.exists){
            //console.log(data._delegate._document.data.value.mapValue.fields.imageUrl);
             this.profileimageUrl=data._delegate._document.data.value.mapValue.fields.imageUrl.stringValue;
            this.changeProfileImage(this.profileimageUrl);
          
          }
        },
        onFail:(err)=> {
          
        },
        
      })
      return this.profileimageUrl;
    })  
  }
  changeProfileImage(event:any){  
    debugger;
    // const reader=new FileReader();
    // reader.onload=(e)=>{
      this.profile.nativeElement.src=event;

  }
  //If user already has profile image but not profile name then this function will be called
 alreadyProfileImage(){
  this.firestore.getDocument({
    path:["profile",this.authService.getAuth().currentUser?.uid!],
    onComplete:(data:any)=>{
      if(data.exists){
        this.profileimageUrl=data._delegate._document.data.value.mapValue.fields.imageUrl.stringValue;
        this.toast.show("Please Enter your profile name","Profile Name");
        return ;
      }
    },
  })
 }

}
