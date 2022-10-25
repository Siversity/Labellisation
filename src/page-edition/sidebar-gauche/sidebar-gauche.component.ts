import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar-gauche',
  templateUrl: './sidebar-gauche.component.html',
  styleUrls: ['./sidebar-gauche.component.css']
})

export class SidebarGaucheComponent implements OnInit {


  // Variables
  //@ts-ignore
  @Input() sbgLancerEventAjoutEtiquetteVersPageEdition: () => void;
  //@ts-ignore
  @Input() sbgLancerEventSupprimerEtiquetteVersPageEdition: () => void;
  //@ts-ignore
  @Input() sbgLancerEventCentrerCameraVersPageEdition: () => void;

  // Constructeur
  constructor() { }


  // A l'initialisation
  ngOnInit(): void {
  }


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
}
