import { Association } from '../../Association';
import { EtiquetteJSON } from '../../Etiquette';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ImageComponent } from './image/image.component';
import { SidebarDroiteComponent } from './sidebar-droite/sidebar-droite.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-edition',
  templateUrl: './page-edition.component.html',
  styleUrls: ['./page-edition.component.css']
})
export class PageEditionComponent implements OnInit {

  ///////////////
  // VARIABLES //
  ///////////////
  nomImage: string = "";

  // Composant Image
  //@ts-ignore
  @ViewChild(ImageComponent) image: ImageComponent;

  // Composant SidebarDroite
  //@ts-ignore
  @ViewChild(SidebarDroiteComponent) sbd: SidebarDroiteComponent;


  //////////////////
  // CONSTRUCTEUR //
  //////////////////
  constructor(private _Activatedroute:ActivatedRoute) { }


  /////////////////////////
  // FONCTIONS PRIMAIRES //
  /////////////////////////
  //#region
  // A l'initialisation
  ngOnInit(): void {
    console.log(this._Activatedroute.snapshot.paramMap.get("nomImage"));
    this.nomImage = this._Activatedroute.snapshot.paramMap.get("nomImage") as string;
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

  pageEditionActualiserEtiquetteVersImage = (etiquetteJSON : EtiquetteJSON, id : string) => {
    this.image.actualiserEtiquette(etiquetteJSON, id);
  }

  pageEditionSelectionnerEtiquetteVersImage = (association : Association) => {
    this.image.selectionnerEtiquette(association);
  }

  pageEditionRenderAllVersImage = () => {
    this.image.canvas.renderAll();
  }
  //#endregion


  //////////////////////////////
  // IMAGE ==> SIDEBAR DROITE //
  //////////////////////////////
  //#region
  pageEditionEnvoyerInfoVersSbd = (etiquette : EtiquetteJSON, id: string) => {
    this.sbd.afficherInformationEtiquette(etiquette, id);
  }

  pageEditionEnvoyerListeEtiquettesVersSbd = (associations : Association[]) => {
    this.sbd.stockerListeEtiquettes(associations);
  }
  //#endregion

}

