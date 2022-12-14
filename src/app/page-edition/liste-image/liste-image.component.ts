import { Component, ElementRef, OnInit } from '@angular/core';
import { getListeNomImages } from 'src/api/getListeNomImages';

@Component({
  selector: 'app-liste-image',
  templateUrl: './liste-image.component.html',
  styleUrls: ['./liste-image.component.css']
})
export class ListeImageComponent implements OnInit {

  listeImages: any = [];
  path : string = "";

  constructor(private elementRef: ElementRef) { }

  /////////////////////////
  // FONCTIONS PRIMAIRES //
  /////////////////////////
  //#region
  // A l'initialisation
  async ngOnInit() {
    this.listeImages = await getListeNomImages();
  }

  ngOndestroy() {
    this.elementRef.nativeElement.remove();
  }
  //#endregion

  //#region 
  setPath() {
    console.log("refresh de la page");
    setTimeout(function(){
      window.location.reload();
    }, 10);
    
  }


  //#endregion

}
