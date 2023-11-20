import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }
  private profileData =new BehaviorSubject<any>('');
  sharedData=this.profileData.asObservable();
  updateData(data:any){
    this.profileData.next(data);
  }
}
