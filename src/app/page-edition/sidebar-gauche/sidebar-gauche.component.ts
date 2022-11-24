import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getListeNomImages } from 'src/api/getListeNomImages';

@Component({
  selector: 'app-sidebar-gauche',
  templateUrl: './sidebar-gauche.component.html',
  styleUrls: ['./sidebar-gauche.component.css']
})

export class SidebarGaucheComponent implements OnInit {

  ///////////////
  // VARIABLES //
  ///////////////

  // Nom image
  @Input() nomImage: string = "";

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
  constructor(private router: Router) { }


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




  async afficherImagePrecedente() {

    let listeImages = await getListeNomImages();
    let indiceImage = listeImages.indexOf(this.nomImage);
    let newImage: string = "";

    if (indiceImage == 0) {
      newImage = listeImages[listeImages.length - 1];
    }
    else {
      newImage = listeImages[indiceImage - 1];
    }

    this.router.navigate(['edition/' + newImage])
      .then(() => {
        window.location.reload();
      })

  }



  async afficherImageSuivante() {

    let listeImages = await getListeNomImages();
    let indiceImage = listeImages.indexOf(this.nomImage);
    let newImage: string = "";

    if (indiceImage == listeImages.length - 1) {
      newImage = listeImages[0];
    }
    else {
      newImage = listeImages[indiceImage + 1];
    }

    this.router.navigate(['edition/' + newImage])
      .then(() => {
        window.location.reload();
      })

  }

}
