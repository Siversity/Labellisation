import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-edition',
  templateUrl: './page-edition.component.html',
  styleUrls: ['./page-edition.component.css']
})
export class PageEditionComponent implements OnInit {

  img : any = "../assets/images/Capture.PNG";
  zoom:boolean=false;
  @Input() placementEtiquette : any = false;

  
  activerPlacementEtiquette(value : any) {
    this.placementEtiquette = value;
    console.log(this.placementEtiquette);
  }

  constructor() { }

  ngOnInit(): void {
  }

  // Chargement du component SidebarGauche
  loadSidebarGauche(test: string) {
    
  }

}
