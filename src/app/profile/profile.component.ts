import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFireStore/firebaseTSFireStore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private router:Router,private firestore:FirebaseTSFirestore,private authService:FirebaseTSAuth,private toast:ToastrService) { }

  addProfile(name:any){
    // let uid:any=this.authService.getAuth().currentUser?.uid!;
    this.firestore.create({
      path:["profile",this.authService.getAuth().currentUser?.uid!],
      data:{
        data:name
      },
      onComplete:(data:any)=>{
        this.toast.success("Profile Created Successfully");
        this.router.navigate(["/dashboard"]);
      },

    })
  }
}
