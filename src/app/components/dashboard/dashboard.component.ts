import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
import {FirebaseTSFirestore} from "firebasets/firebasetsFireStore/firebaseTSFireStore"
import { CreatepostComponent } from '../createpost/createpost.component';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isUserProfileExits:boolean=true;
  ngOnInit(): void {
    this.isuserProfileCreated();
  }
  constructor(private firestore:FirebaseTSFirestore,private dialog:MatDialog,private authService:FirebaseTSAuth) {

   }
  getAddPost(){
    this.dialog.open(CreatepostComponent);
  }
  isuserProfileCreated():boolean{
    this.firestore.getDocument({

      path:["profile",this.authService.getAuth().currentUser?.uid!],
      onComplete:(data:any)=>{
          this.isUserProfileExits=data.exists;
      }
    })
    
    return this.isUserProfileExits;
  }
}
