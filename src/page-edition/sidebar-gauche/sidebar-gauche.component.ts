import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-gauche',
  templateUrl: './sidebar-gauche.component.html',
  styleUrls: ['./sidebar-gauche.component.css']
})

export class SidebarGaucheComponent implements OnInit {

  ///////////////
  // VARIABLES //
  ///////////////

  // Fonction d'appel d'ajout d'une étiquette
  //@ts-ignore
  @Input() sbgLancerEventAjoutEtiquetteVersPageEdition: () => void;

  // Fonction d'appel de suppression d'une étiquette
  //@ts-ignore
  @Input() sbgLancerEventSupprimerEtiquetteVersPageEdition: () => void;

  // Fonction d'appel du centrage d'une image
  //@ts-ignore
  @Input() sbgLancerEventCentrerCameraVersPageEdition: () => void;


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
  // Event : lorsque l'on clique sur le bouton ajouter une étiquette
  eventBoutonAjouterEtiquette() {
    this.sbgLancerEventAjoutEtiquetteVersPageEdition();
  }

  // Event : lorsque l'on clique sur le bouton on supprime une étiquette
  eventBoutonSupprimerEtiquette() {
    this.sbgLancerEventSupprimerEtiquetteVersPageEdition();
  }

  // Event : lorsque l'on clique sur le bouton on recentre l'image
  eventBoutonCentrerCamera() {
    this.sbgLancerEventCentrerCameraVersPageEdition();
  }
  //#endregion

}
