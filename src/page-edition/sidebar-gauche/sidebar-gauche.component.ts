import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-gauche',
  templateUrl: './sidebar-gauche.component.html',
  styleUrls: ['./sidebar-gauche.component.css']
})

export class SidebarGaucheComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

export class AppComponent {  
  zoom:boolean=false;
  zoomOut(){
    this.zoom=false;
  }
  zoomIn(){
    
    this.zoom=true;
  }
  getheight(){
    if(this.zoom==true){
      return '500px';
      //return your desiderd value in pixel or in percentage
    }
    else{
      return '200px';
      }
  }

}