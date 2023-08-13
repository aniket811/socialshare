import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SpinnerComponent } from './components/spinner/spinner.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'socialshare';
  constructor(private sanitizer:DomSanitizer,private dialog:MatDialog){

  }
  showSpinner=true
  ngOnInit(): void {
    if(this.showSpinner==true){
      this.dialog.open(SpinnerComponent,{
        panelClass:'custom-dialog'
      });
    }
    setTimeout(() => {
        this.showSpinner=false;
        this.dialog.closeAll();
      }, 3000);
     
  }
  
}
