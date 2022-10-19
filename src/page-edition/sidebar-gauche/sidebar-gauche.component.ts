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


  // Constructeur
  constructor() { }


  // A l'initialisation
  ngOnInit(): void {
  }


  // Event : lorsque l'on clique sur le bouton ajouter une étiquette
  eventBoutonAjouterEtiquette() {
    this.sbgLancerEventAjoutEtiquetteVersPageEdition();
  }

}
