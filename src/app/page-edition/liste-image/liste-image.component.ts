import { Component, OnInit } from '@angular/core';
import { getListeNomImages } from 'src/api/getListeNomImages';

@Component({
  selector: 'app-liste-image',
  templateUrl: './liste-image.component.html',
  styleUrls: ['./liste-image.component.css']
})
export class ListeImageComponent implements OnInit {

  listeImages: any = [];

  constructor() { }

  /////////////////////////
  // FONCTIONS PRIMAIRES //
  /////////////////////////
  //#region
  // A l'initialisation
  async ngOnInit() {
    this.listeImages = await getListeNomImages();
  }
  //#endregion

}
