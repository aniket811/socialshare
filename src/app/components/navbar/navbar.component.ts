import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFireStore/firebaseTSFireStore';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isUserLoggedIn:boolean=false;
  displayName:string='Guest';
  isUserProfileExist:boolean=false;
    constructor(private authService:FirebaseTSAuth,private router:Router,private authUserService:AuthServiceService,private firestore:FirebaseTSFirestore) {
      
    }
  ngOnInit(): void {
    this.isLoggedIn();
  }

  logout(){
    this.authService.signOut({
      onComplete:()=>{
        this.router.navigateByUrl("/login")
      }
    })
  }
  
  isLoggedIn():boolean{
    this.authUserService.isUserLoggedIn.subscribe((value)=>{
    this.isUserLoggedIn=value; 
      if(this.isUserLoggedIn){
        // this.firestore.getCollection({
        //   // path:['profile',this.authService.getAuth().currentUser?.uid!],
        //   // onComplete:(data:any)=>{
        //   //   if(data.exists)
        //   //     this.displayName=data;
        //   //   console.log(data);
            
        //   //   this.displayName="Guest"
        //   // }
        // )
        this.firestore.getDocument({
          path:['profile',this.authService.getAuth().currentUser?.uid!],
          onComplete:(data:any)=>{


              console.log(data._delegate._document.data.value.mapValue.fields.data.stringValue);
              this.displayName=data._delegate._document.data.value.mapValue.fields.data.stringValue
            
          } 
        })
      }

    })
    
    return this.isUserLoggedIn;
  }
  
  
}
