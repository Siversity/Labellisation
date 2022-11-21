import { EtiquetteJSON } from '../../../Etiquette';
import { Component, Input, OnInit } from '@angular/core';
import { Association } from 'src/Association';

@Component({
  selector: 'app-sidebar-droite',
  templateUrl: './sidebar-droite.component.html',
  styleUrls: ['./sidebar-droite.component.css']
})

export class SidebarDroiteComponent implements OnInit {

  ///////////////
  // VARIABLES //
  ///////////////
  // Variables d'informations d'étiquette
  coordX: number = -1
  coordY: number = -1;
  tailleX: number = -1;
  tailleY: number = -1;
  texte: string = "";
  classe: string = "";
  listAssociationActu : Association[] = [];
  id: string = "";

  // Fonction d'appel de la sauvegarde
  //@ts-ignore
  @Input() sbdLancerEventSauvegarderEtiquetteVersPageEdition: () => void;

  // Fonction d'appel de la réactualisation de l'étiquette
  //@ts-ignore
  @Input() sbdActualiserEtiquetteVersPageEdition: (json: EtiquetteJSON, id: string) => void;

  // Fonction de sélection d'étiquette
  //@ts-ignore
  @Input() sbdSelectionnerEtiquetteVersPageEdition: (association : Association) => void; 

  // Fonction de trigger de render du canvas
  //@ts-ignore
  @Input() sbdRenderAllVersPageEdition: () => void;


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

  // À la sélection d'une étiquette
  afficherInformationEtiquette(etiquette: EtiquetteJSON, id: string) {
    this.coordX = etiquette.box[0] as number;
    this.coordY = etiquette.box[1] as number;
    this.tailleX = etiquette.box[2] as number;
    this.tailleY = etiquette.box[3] as number;
    this.texte = etiquette.text;
    this.classe = etiquette.class;

    // Définition de l'id de l'étiquette affichée
    this.id = id;
  }

  stockerListeEtiquettes(associations: Association[]) {
    this.listAssociationActu = associations;
    console.log(this.listAssociationActu)
  }
  //#endregion


  //////////////////////////////
  // SIDEBAR DROITE ==> IMAGE //
  //////////////////////////////
  //#region
  actualiserEtiquette(event: Event) {

    // Actualisation des données
    switch ((event.target as HTMLInputElement).name) {
      case "texte":
        this.texte = (event.target as HTMLInputElement).value;
        break;
      case "classe":
        this.classe = (event.target as HTMLInputElement).value;
        break;
      case "tailleX":
        this.tailleX = parseFloat((event.target as HTMLInputElement).value);
        break;
      case "tailleY":
        this.tailleY = parseFloat((event.target as HTMLInputElement).value);
        break;
      case "coordX":
        this.coordX = parseFloat((event.target as HTMLInputElement).value);
        break;
      case "coordY":
        this.coordY = parseFloat((event.target as HTMLInputElement).value);
        break;
    }

    // Création du json
    let json: EtiquetteJSON = {
      text: this.texte,
      class: this.classe,
      box: [this.coordX, this.coordY, this.tailleX, this.tailleY],
    };

    console.log(this.tailleX)

    // Envoi à PageEdition
    this.sbdActualiserEtiquetteVersPageEdition(json, this.id);
  }

  selectionnerEtiquette(association: Association) {
    this.sbdSelectionnerEtiquetteVersPageEdition(association);
  }

  animationEntrerEtiquette(association: Association) {
    association.getRect().set({
      backgroundColor: 'rgba(250,250,250,1)',
    })
    this.sbdRenderAllVersPageEdition();
  }

  animationSortirEtiquette(association: Association) {
    association.getRect().set({
      backgroundColor: 'rgba(255,0,0,0.5)',
    })
    this.sbdRenderAllVersPageEdition();
  }
  //#endregion
}
