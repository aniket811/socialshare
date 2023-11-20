import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  FirebaseTSFirestore,
  Limit,
} from 'firebasets/firebasetsFireStore/firebaseTSFireStore';
import { CreatepostComponent } from '../createpost/createpost.component';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { PostData } from './posts/posts.component';
import { ToastrService } from 'ngx-toastr';
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { AuthServiceService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isUserProfileExits: boolean = true;
  postDatas: PostData[]=[];
  ngOnInit(): void {

    if(this.customAuthService.isUserProfileExists.value==true){
      
      this.isuserProfileCreated();
    }
    this.getPosts();
   
  }
  constructor(
    private toast: ToastrService,
    private firestore: FirebaseTSFirestore,
    private dialog: MatDialog,
    private authService: FirebaseTSAuth,
    private customAuthService:AuthServiceService
  ) {}
  getAddPost() {
    this.dialog.open(CreatepostComponent);
  }
  isuserProfileCreated(): boolean {
    this.firestore.getDocument({
      path: ['profile', this.authService.getAuth().currentUser?.uid!],
      onComplete: (data: any) => {


        if(data.data!=undefined||!data._delegate._document.data.value.mapValue.fields.hasOwnProperty('data')){          
          this.isUserProfileExits = false;
          
          
        }
        else if(data.data==undefined||data._delegate._document.data.value.mapValue.fields.hasOwnProperty('data')){
          this.isUserProfileExits = true;
        }
      },
    });
    
    this.customAuthService.isUserProfileExists.next(this.isUserProfileExits)
    return this.isUserProfileExits;
  }
  getPosts() {
    this.firestore.getCollection({
      path: ['Posts'],
      where: [new Limit(10)],
      onComplete: (PostdataInfo: any) => {
        console.log(PostdataInfo);
        
        PostdataInfo.docs.forEach((data: any) => {
       this.postDatas.push(data.data())
       console.log(this.postDatas);
          
      })
      ;
      this.firestore.getCollection({
        path:['profile'],
        where:[

        ],
        onComplete:()=>{
          
        }
      })
      },
    });
  }   
}
