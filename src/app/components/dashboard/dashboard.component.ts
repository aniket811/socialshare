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
  isUserProfileExits: boolean = false;
  postDatas: PostData[] = [];
  ngOnInit(): void {
    this.isuserProfileCreated();
    this.getPosts();
  }
  constructor(
    private toast: ToastrService,
    private firestore: FirebaseTSFirestore,
    private dialog: MatDialog,
    private authService: FirebaseTSAuth,
    private customAuthService: AuthServiceService
  ) { }
  getAddPost() {
    this.dialog.open(CreatepostComponent);
  }
  isuserProfileCreated(): boolean {
    this.firestore.getDocument({
      path: ['profile', this.authService.getAuth().currentUser?.uid!],
      onComplete: (data: any) => {
        console.log(data);
        
        // revert this value if there is any bug in this code
        if(data.exists){

          if (data._delegate._document.data.value.mapValue.fields.hasOwnProperty('data')) {
            this.isUserProfileExits = true;
          }
        }
        

        else if (!data._delegate._document.data.value.mapValue.fields.hasOwnProperty('data')) {
          this.isUserProfileExits = false;
        }
      },
    });
    return this.isUserProfileExits;
  }
  getPosts() {
    this.firestore.getCollection({
      path: ['Posts'],
      where: [new Limit(10)],
      onComplete: (PostdataInfo: any) => {

        PostdataInfo.docs.forEach((data: any) => {
          this.postDatas.push(data.data())

        })
          ;
        this.firestore.getCollection({
          path: ['profile'],
          where: [

          ],
          onComplete: () => {

          }
        })
      },
    });
  }
  //After Profile Created and name added 
  profileNameAdded() {
    if (this.customAuthService.isUserProfileExists.value == true) {

      this.isUserProfileExits = true;
    }
    // this.isuserProfileCreated();
    // this.getPosts();
  }
}
