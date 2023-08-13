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
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isUserProfileExits: boolean = true;
  postDatas: PostData[]=[];
  ngOnInit(): void {
    this.isuserProfileCreated();
    this.getPosts();
   
  }
  constructor(
    private toast: ToastrService,
    private firestore: FirebaseTSFirestore,
    private dialog: MatDialog,
    private authService: FirebaseTSAuth
  ) {}
  getAddPost() {
    this.dialog.open(CreatepostComponent);
  }
  isuserProfileCreated(): boolean {
    this.firestore.getDocument({
      path: ['profile', this.authService.getAuth().currentUser?.uid!],
      onComplete: (data: any) => {
        this.isUserProfileExits = data.exists;
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
