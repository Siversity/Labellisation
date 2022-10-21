import { Etiquette } from './../Etiquette';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ImageComponent } from './image/image.component';
import { SidebarDroiteComponent } from './sidebar-droite/sidebar-droite.component';

@Component({
  selector: 'app-page-edition',
  templateUrl: './page-edition.component.html',
  styleUrls: ['./page-edition.component.css']
})
export class PageEditionComponent implements OnInit {

  ///////////////
  // VARIABLES //
  ///////////////

  // Composant Image
  //@ts-ignore
  @ViewChild(ImageComponent) image: ImageComponent;

  // Composant SidebarDroite
  //@ts-ignore
  @ViewChild(SidebarDroiteComponent) sbd: SidebarDroiteComponent;


  //////////////////
  // CONSTRUCTEUR //
  //////////////////
  constructor() { }


  /////////////////////////
  // FONCTIONS PRIMAIRES //
  /////////////////////////
  //#region
  // A l'initialisation
  ngOnInit(): void {
  }
  //#endregion


  //////////////////////////////
  // SIDEBAR GAUCHE ==> IMAGE //
  //////////////////////////////
  //#region
  // On force le composant enfant Image à ajouter une étiquette depuis l'enfant SidebarGauche
  pageEditionAjouterEtiquetteVersImage = () => {
    this.image.activerAjoutEtiquette();
  }

  // On force le composant enfant Image à supprimer une ou des étiquettes
  pageEditionSupprimerEtiquetteVersImage = () => {
    this.image.supprimerEtiquette();
  }

  // On force le composant enfant Image à centrer la caméra
  pageEditionCentrerCameraVersImage = () => {
    this.image.recentrerImage();
  }
  //#endregion


  //////////////////////////////
  // SIDEBAR DROITE ==> IMAGE //
  //////////////////////////////
  //#region 
  // On force le composant à sauvegarder les images
  pageEditionSauvegarderEtiquettesVersImage = () => {
    this.image.sauvegarderEtiquettes();
  }
  //#endregion


  //////////////////////////////
  // IMAGE ==> SIDEBAR DROITE //
  //////////////////////////////
  //#region
  pageEditionEnvoyerInfoVersSbd = (etiquette : Etiquette) => {
    this.sbd.afficherInformationEtiquette(etiquette);
  }
  //#endregion

}

