import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ImageComponent } from './image/image.component';

@Component({
  selector: 'app-page-edition',
  templateUrl: './page-edition.component.html',
  styleUrls: ['./page-edition.component.css']
})
export class PageEditionComponent implements OnInit {

  // Composant Image
  //@ts-ignore
  @ViewChild(ImageComponent) image: ImageComponent;
  


  // Constructeur
  constructor() { }


  // A l'initialisation
  ngOnInit(): void {
  }


  // On force le composant enfant Image à ajouter une étiquette
  pageEditionAjouterEtiquetteVersImage = () => {
    this.image.modifierStatutEtiquette();
  }

  // On force le composant enfant Image à supprimer une ou des étiquettes
  pageEditionSupprimerEtiquetteVersImage = () => {
    this.image.supprimerEtiquette();
  }

  // On force le composant enfant Image à centrer la caméra
  pageEditionCentrerCameraVersImage = () => {
    this.image.recentrerCamera();
  }
}

