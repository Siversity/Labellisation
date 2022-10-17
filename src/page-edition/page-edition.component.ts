import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-edition',
  templateUrl: './page-edition.component.html',
  styleUrls: ['./page-edition.component.css']
})
export class PageEditionComponent implements OnInit {

  img : any = "../assets/images/Capture.PNG";
  zoom:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

  // Chargement du component SidebarGauche
  loadSidebarGauche(test: string) {
    
  }
  
  zoomOut(){
    this.zoom=false;
  }
  zoomIn(){
    
    this.zoom=true;
  }
  getheight(){
    if(this.zoom==true){
      return '500px';
    }
    else{
      return '200px';
      }
  }

}
