import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  isUserLoggedIn=new BehaviorSubject<boolean> (false);
  constructor() { }
}
