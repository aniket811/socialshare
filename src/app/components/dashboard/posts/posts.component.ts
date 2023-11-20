import { Component, Input, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore, Limit } from 'firebasets/firebasetsFireStore/firebaseTSFireStore';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @Input() posts!: PostData;
  creatorName: string | undefined;

  constructor(private auths: FirebaseTSAuth, private firestore: FirebaseTSFirestore) { }
  ngOnInit(): void {
  }
}
export interface PostData {
  captions: string;
  creatorId: string;
  ImageUrl?: string;
  creatorName: string;
  createdAt: Date;
  likes: number;
  comments: number;
  profileImageUrl: string; 
}
