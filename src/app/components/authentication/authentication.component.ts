import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  constructor(private router:Router) {}
  ngOnInit(){


  }
  onRegisterClick() {
    this.router.navigate(['/register']);
  }
  // Method for user to get logged  in if they have an account and email verified
  getUserLogin(userData:any) {

  }
}
