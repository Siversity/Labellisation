import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-droite',
  templateUrl: './sidebar-droite.component.html',
  styleUrls: ['./sidebar-droite.component.css']
})

export class SidebarDroiteComponent implements OnInit {


  // Variables
  //@ts-ignore
  @Input() sbdLancerEventSauvegarderEtiquetteVersPageEdition: () => void;


  // Constructeur
  constructor() { }


  // A l'initialisation
  ngOnInit(): void { }


  // Event : lorsque l'on clique sur le bouton sauvegarder
  eventSauvegarderEtiquette() {
    this.sbdLancerEventSauvegarderEtiquetteVersPageEdition();
  }

}
