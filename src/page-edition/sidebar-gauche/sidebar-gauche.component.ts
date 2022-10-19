import { Component, Input, OnInit } from '@angular/core';

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

  eventBoutonSupprimerEtiquette() {
    this.sbgLancerEventSupprimerEtiquetteVersPageEdition();
  }

  eventBoutonCentrerCamera() {
    this.sbgLancerEventCentrerCameraVersPageEdition();
  }
}
