import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-droite',
  templateUrl: './sidebar-droite.component.html',
  styleUrls: ['./sidebar-droite.component.css']
})

export class SidebarDroiteComponent implements OnInit {

  ///////////////
  // VARIABLES //
  ///////////////
  
  // Fonction d'appel de la sauvegarde
  //@ts-ignore
  @Input() sbdLancerEventSauvegarderEtiquetteVersPageEdition: () => void;


  //////////////////
  // CONSTRUCTEUR //
  //////////////////
  constructor() { }


  /////////////////////////
  // FONCTIONS PRIMAIRES //
  /////////////////////////
  //#region
  // A l'initialisation
  ngOnInit(): void { }
  //#endregion
  
  
  //////////////////////////////
  // IMAGE ==> SIDEBAR DROITE //
  //////////////////////////////
  //#region
  // Event : lorsque l'on clique sur le bouton sauvegarder
  eventSauvegarderEtiquette() {
    this.sbdLancerEventSauvegarderEtiquetteVersPageEdition();
  }
  //#endregion

}
