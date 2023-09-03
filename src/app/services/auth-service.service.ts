import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  isUserLoggedIn=new BehaviorSubject<boolean> (false);
  isUserProfileExists=new BehaviorSubject<boolean> (false);
  UserProfileName=new BehaviorSubject<string> ('Guest');
  constructor() { }
}
