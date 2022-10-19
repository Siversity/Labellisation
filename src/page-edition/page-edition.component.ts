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


  // On force le composant enfant Image à ajouter une étiquette depuis l'enfant SidebarGauche
  pageEditionAjouterEtiquetteVersImage = () => {
    this.image.modifierStatutEtiquette();
  }


  // On force le composant enfant Image à sauvegarder les étiquettes depuis l'enfant SidebarDroite
  pageEditionSauvegarderEtiquetteVersImage = () => {
    this.image.sauvegarderEtiquettes();
  }

}
