import { Component, Input, OnInit } from '@angular/core';
import { fabric } from 'fabric';
import { EtiquetteJSON } from 'src/Etiquette';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})

export class ImageComponent implements OnInit {

  ///////////////
  // VARIABLES //
  ///////////////
  // Fonctions appelé par parent
  //@ts-ignore
  @Input() imageEnvoyerInfoVersPageEdition: (etiquetteJSON: EtiquetteJSON) => void;
  //@ts-ignore
  @Input() imageEnvoyerListeEtiquetteJSONsVersPageEdition: (etiquetteJSONs: EtiquetteJSON[]) => void;

  // Stockage du canvas utilisé
  canvas: fabric.Canvas = new fabric.Canvas("canvas", {});

  // Gestion des évènements d'ajout
  boutonAjouterEtiquetteJSON: boolean = false;
  curseurSurEtiquetteJSON: boolean = false;

  // Données image
  lienImage: string = 'assets/images/cutecats3.jpg';
  lienJSON: string = 'assets/jsons/cutecats2.json';



  //////////////////
  // CONSTRUCTEUR //
  //////////////////
  constructor() { }


  /////////////////////////
  // FONCTIONS PRIMAIRES //
  /////////////////////////
  //#region
  // A l'initialisation du composant
  ngOnInit(): void {
    // Création d'un canvas vide
    this.canvas = new fabric.Canvas("canvas", {
      uniformScaling: false
    });

    // Désactiver la rotation lors d'une sélection multiple
    fabric.Group.prototype.hasControls = false;

    // Changement du type de curseur
    this.canvas.defaultCursor = "Handwriting";

    // Création du canvas et import de l'image
    this.importerImage();
    this.chargerEtiquetteJSONs();
  }

  // Lorsque le composant est initialisé
  ngAfterContentInit() {
    // Ajout des fonctionnalités d'édition
    this.ajouterEtiquetteJSON();
    this.limiterEtiquetteJSONs();
    this.zoomerImage();
  }
  //#endregion


  ///////////////////////////
  // GESTION DES VARIABLES //
  ///////////////////////////
  //#region
  // Gestion de l'ajout d'une étiquette
  activerAjoutEtiquetteJSON() {
    // Activer l'ajout d'une étiquette
    this.boutonAjouterEtiquetteJSON = true;

    // Désactiver la sélection des autres étiquettes
    this.canvas.selection = false;
  }
  //#endregion


  /////////////////////////////
  // CREATION DES ETIQUETTEJSONS //
  /////////////////////////////
  //#region 
  // Création d'une étiquette
  creerEtiquetteJSON(origX: number, origY: number, tailleX: number, tailleY: number) {
    // Initialisation de l'étiquette
    let etiquetteJSON: fabric.Rect = new fabric.Rect({
      left: origX,
      top: origY,
      originX: 'left',
      originY: 'top',
      width: tailleX,
      height: tailleY,
      angle: 0,
      fill: 'rgba(0,0,0,0)',
      backgroundColor: 'rgba(255,0,0,0.5)',
      opacity: 0.7,
      transparentCorners: false,
    });

    // Désactivation de la possibilité de rotation de l'étiquette
    etiquetteJSON.setControlsVisibility({ mtr: false });

    // Ajout de l'étiquette au canvas
    this.canvas.add(etiquetteJSON);

    // Envoi de l'étiquette
    return etiquetteJSON;
  }

  // Création d'un étiquette via la souris
  ajouterEtiquetteJSON() {
    // Initialisation des variables
    var mouseIsDown: boolean; // Etat de la souris
    var etiquetteJSON: fabric.Rect;
    var origX: number; // Position X
    var origY: number; // Position Y

    // Lorsque le clic de la souris est maintenu
    this.canvas.on('mouse:down', (o) => {

      // Mise à jour du pointer (souris)
      var pointer = this.canvas.getPointer(o.e);
      origX = pointer.x;
      origY = pointer.y;
      var pointer = this.canvas.getPointer(o.e);

      if (this.boutonAjouterEtiquetteJSON == true && this.curseurSurEtiquetteJSON == false) {
        mouseIsDown = true;

        // Création de l'étiquette
        etiquetteJSON = this.creerEtiquetteJSON(origX, origY, pointer.x - origX, pointer.y - origY);

        // Ajouter les évènements d'affichage des infos
        this.ajouterEvenementAffichageInformations(etiquetteJSON, "", "");

        // Actualiser la liste d'étiquettes de sidebar droite
        this.evenementEnvoyerListeEtiquetteJSONs(this.canvas.getObjects() as any);

        // Sélectionner l'étiquette nouvellement créée
        this.canvas.setActiveObject(etiquetteJSON);
      }

      // Lorsque l'on bouge la souris
      this.canvas.on('mouse:move', (o) => {
        if (this.boutonAjouterEtiquetteJSON == true) {
          if (!mouseIsDown) return;
          var pointer = this.canvas.getPointer(o.e);

          if (origX > pointer.x) {
            etiquetteJSON.set({ left: Math.abs(pointer.x) });
          }
          if (origY > pointer.y) {
            etiquetteJSON.set({ top: Math.abs(pointer.y) });
          }

          etiquetteJSON.set({ width: Math.abs(origX - pointer.x) });
          etiquetteJSON.set({ height: Math.abs(origY - pointer.y) });

          // Ajouter les évènements d'affichage des infos
          this.ajouterEvenementAffichageInformations(etiquetteJSON, "", "");

          this.canvas.renderAll();
        }
      });

      // Lorsque le clic de la souris est relevé
      this.canvas.on('mouse:up', (o) => {
        if (this.boutonAjouterEtiquetteJSON == true && this.curseurSurEtiquetteJSON == false) {
          mouseIsDown = false;
          this.boutonAjouterEtiquetteJSON = false;

          // Réactiver sélection 
          this.canvas.selection = true;

          // Ajouter les évènements d'affichage des infos
          var etiquetteJSONJSON: EtiquetteJSON = {
            box: [origX, origY, pointer.x - origX, pointer.y - origY],
            text: "",
            class: ""
          }
          this.ajouterEvenementsEtiquetteJSONs(etiquetteJSON, etiquetteJSONJSON);

          // Ajouter les évènements d'hover à l'étiquette
          etiquetteJSON.on("mouseover", (o) => {
            this.curseurSurEtiquetteJSON = true;
          })
          etiquetteJSON.on("mouseout", (o) => {
            this.curseurSurEtiquetteJSON = false;
          })
        }
      });
    });
  }

  // Création des étiquettes déjà existantes
  chargerEtiquetteJSONs() {
    // On récupère le JSON existant
    fetch(this.lienJSON).then((data: Response) => data.json())
      .then((listeEtiquetteJSONs: EtiquetteJSON[]) => {
        // On affiche chaque étiquette
        listeEtiquetteJSONs.forEach((etiquetteJSONJSON: any) => {

          let ratio: number = this.canvas.getObjects()[0].scaleX as number;

          // Création de l'objet
          let etiquetteJSON: fabric.Rect = this.creerEtiquetteJSON(etiquetteJSONJSON.box[0] * ratio, etiquetteJSONJSON.box[1] * ratio, etiquetteJSONJSON.box[2] * ratio, etiquetteJSONJSON.box[3] * ratio);

          // Ajouter les évènements d'affichage des infos
          this.ajouterEvenementsEtiquetteJSONs(etiquetteJSON, etiquetteJSONJSON);

          // Ajouter les évènements d'hover à l'étiquette
          etiquetteJSON.on("mouseover", (o) => {
            this.curseurSurEtiquetteJSON = true;
          })
          etiquetteJSON.on("mouseout", (o) => {
            this.curseurSurEtiquetteJSON = false;
          })
        })
        // Actualiser la liste d'étiquettes dans sidebar Droite
        this.evenementEnvoyerListeEtiquetteJSONs(this.canvas.getObjects() as any);
      }).catch(function () {
        console.log("Impossible de charger les étiquettes");
      });
  }


  // Fonction d'ajout des évènements d'affichage des infos
  ajouterEvenementsEtiquetteJSONs(etiquetteJSON: fabric.Rect, etiquetteJSONJSON: EtiquetteJSON) {
    // On ajoute l'événement de sélection de l'étiquette
    etiquetteJSON.on('scaling', () => {
      this.ajouterEvenementAffichageInformations(etiquetteJSON, etiquetteJSONJSON.text, etiquetteJSONJSON.class);
    })
    etiquetteJSON.on('selected', () => {
      this.ajouterEvenementAffichageInformations(etiquetteJSON, etiquetteJSONJSON.text, etiquetteJSONJSON.class);
    })
    etiquetteJSON.on('moving', () => {
      this.ajouterEvenementAffichageInformations(etiquetteJSON, etiquetteJSONJSON.text, etiquetteJSONJSON.class);
    })
  }


  // Fonction d'affichage des informations vers la SidebarDroite
  ajouterEvenementAffichageInformations(etiquetteJSON: fabric.Rect, texte: string, classe: string) {
    // Récupération du ratio de l'image
    let ratio: number = this.canvas.getObjects()[0].scaleX as number;

    // Création de l'objet EtiquetteJSON à afficher sur la SidebarDroite
    let etiquetteJSONJSON: EtiquetteJSON = {
      //box: [etiquetteJSON.left as number / ratio, etiquetteJSON.top as number / ratio, etiquetteJSON.width as number / ratio, etiquetteJSON.height as number / ratio],
      //@ts-ignore
      box: [etiquetteJSON.left as number / ratio, etiquetteJSON.top as number / ratio, (etiquetteJSON.width * etiquetteJSON.scaleX) as number / ratio, (etiquetteJSON.height * etiquetteJSON.scaleY) as number / ratio],
      text: texte,
      class: classe
    }

    // Envoi de l'étiquette vers la SidebarDroite
    this.imageEnvoyerInfoVersPageEdition(etiquetteJSONJSON);
  }

  evenementEnvoyerListeEtiquetteJSONs(etiquetteJSONs: fabric.Rect[]) {
    // Récupération du ratio de l'image
    let ratio: number = this.canvas.getObjects()[0].scaleX as number;
    let list : any = Array();


    for (let i = 1; i < etiquetteJSONs.length; i++) {
      let etiquetteJSONJSON: EtiquetteJSON = {
        //@ts-ignore
        box: [etiquetteJSONs[i].left as number / ratio, etiquetteJSONs[i].top as number / ratio, (etiquetteJSONs[i].width * etiquetteJSONs[i].scaleX) as number / ratio, (etiquetteJSONs[i].height * etiquetteJSONs[i].scaleY) as number / ratio],
        text: i.toString(),
        class: i.toString()
      }

      list.push(etiquetteJSONJSON);
    }

    // Envoi de l'étiquette vers la SidebarDroite
    this.imageEnvoyerListeEtiquetteJSONsVersPageEdition(list);
  }
  //#endregion


  ////////////////////////////
  // GESTION DES ETIQUETTEJSONS //
  ////////////////////////////
  //#region
  // Supprimer les étiquettes sélectionnées
  supprimerEtiquetteJSON() {
    this.canvas.getActiveObjects().forEach(etiquetteJSON => {
      this.canvas.remove(etiquetteJSON);
    })
    this.evenementEnvoyerListeEtiquetteJSONs(this.canvas.getObjects());
  }

  // Limite des étiquettes
  limiterEtiquetteJSONs() {
    this.canvas.on('object:moving', (e: any) => {
      var obj = e.target;
      // if object is too big ignore
      if (obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width) {
        return;
      }
      obj.setCoords();
      // top-left  corner
      if (obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0) {
        obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top);
        obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left);
      }
      // bot-right corner
      if (obj.getBoundingRect().top + obj.getBoundingRect().height > obj.canvas.height || obj.getBoundingRect().left + obj.getBoundingRect().width > obj.canvas.width) {
        obj.top = Math.min(obj.top, obj.canvas.height - obj.getBoundingRect().height + obj.top - obj.getBoundingRect().top);
        obj.left = Math.min(obj.left, obj.canvas.width - obj.getBoundingRect().width + obj.left - obj.getBoundingRect().left);
      }
    });
  }

  // Sauvegarde des changements effectués
  sauvegarderEtiquetteJSONs(): void {
    console.log("Début de la sauvegarde des étiquettes");

    // On initialise une liste vide qui va contenir le JSON de chaque étiquette
    let listeEtiquetteJSONsJSON: EtiquetteJSON[] = [];

    // On récupère le ratio de l'image
    let ratio = this.canvas.getObjects()[0].scaleX;

    // Pour chaque étiquette, on crée un JSON
    this.canvas.getObjects().forEach((etiquetteJSON: fabric.Object) => {
      if (etiquetteJSON.type != "image") {
        // Création de l'étiquette
        let etiquetteJSONJSON: EtiquetteJSON = {
          //@ts-ignore
          box: [etiquetteJSON.left / ratio, etiquetteJSON.top / ratio, etiquetteJSON.getScaledWidth() / ratio, etiquetteJSON.getScaledHeight() / ratio],
          text: "Test",
          class: "Test"
        }

        // On ajoute l'étiquette dans notre liste
        listeEtiquetteJSONsJSON.push(etiquetteJSONJSON);
      }
    })

    console.log(JSON.stringify(listeEtiquetteJSONsJSON));
  }

  // Fonction pour actualiser les étiquettes
  actualiserEtiquetteJSON(texte: string, classe: string, coordX: number, coordY: number, tailleX: number, tailleY: number) {

    // Si aucun objet n'est sélectionné, ne rien faire
    if (this.canvas.getActiveObjects().length == 0) {
      return;
    }

    // Récupération des données de calcul
    let img : any = this.canvas.getObjects()[0];
    let etiquetteJSON: fabric.Object = this.canvas.getActiveObjects()[0];
    let ratio: number = img.scaleX as number;

    // Calcul de la taille des étiquettes à afficher
    etiquetteJSON.left = coordX * ratio;
    etiquetteJSON.top = coordY * ratio;
    etiquetteJSON.width = (tailleX * ratio) / (etiquetteJSON.scaleX as number);
    etiquetteJSON.height = (tailleY * ratio) / (etiquetteJSON.scaleY as number);

    console.log((tailleX * (etiquetteJSON.scaleX as number)))

    if ((etiquetteJSON.left) + (tailleX * (etiquetteJSON.scaleX as number)) >= img.width) {
      console.log("1er if")
      etiquetteJSON.left = img.width - (tailleX * (etiquetteJSON.scaleX as number));
    }
    if (etiquetteJSON.left as number <= 0) {
      console.log("2ème if")
      etiquetteJSON.left = 0;
    }
    if ((etiquetteJSON.top) + (tailleY * (etiquetteJSON.scaleY as number)) >= img.height) {
      console.log("3ème if")
      etiquetteJSON.top = img.width - (tailleY * (etiquetteJSON.scaleY as number));
    }
    if (etiquetteJSON.top  <= 0) {
      console.log("4ème if")
      etiquetteJSON.top = 0;
    }

    // Render des étiquettes
    this.canvas.renderAll();

    this.ajouterEvenementAffichageInformations(etiquetteJSON, texte, classe)

    // Réinitialisation du scale des étiquettes
    etiquetteJSON.scaleX = 1;
    etiquetteJSON.scaleY = 1;
  }
  //#endregion


  ////////////////////////
  // GESTION DE L'IMAGE //
  ////////////////////////
  //#region
  // Fonction d'import des images
  importerImage(): void {
    fabric.Image.fromURL(this.lienImage, (image: fabric.Image) => {

      // Propriétés de l'image
      image.selectable = false;
      image.hoverCursor = "pointer"

      // Responsive
      this.tailleImage(image);
      window.addEventListener('resize', () => { this.tailleImage(image), this.tailleEtiquetteJSONs() })

      // Affichage de l'image
      this.canvas.add(image);
    });
  }

  // Fonction pour afficher les etiquetteJSONs de manière responsive
  tailleEtiquetteJSONs() {

    // Calcul du ratio de l'image
    let ratio: number = this.canvas.getObjects()[0].scaleX as number;

    // Redimensionnement pour chaque etiquetteJSON
    this.canvas.getObjects().forEach((etiquetteJSON: fabric.Object) => {

      if (etiquetteJSON.type != 'image') {

        // Origine
        etiquetteJSON.top = 100 * ratio;
        etiquetteJSON.left = 100 * ratio;

        // Taille
        etiquetteJSON.scaleToWidth(100 * ratio);
        etiquetteJSON.scaleToHeight(100 * ratio);
      }
    })
  }

  // Fonction pour afficher l'image de manière responsive
  tailleImage(image: fabric.Object): void {
    // Longeur image > hauteur image
    if ((image.width as number) >= (image.height as number)) {
      this.canvas.setWidth(document.getElementById("editionCol")?.clientWidth as number);
      image.scaleToWidth(this.canvas.width as number);
      this.canvas.setHeight(image.getScaledHeight() as number)

      if ((image.getScaledHeight() as number) > (window.innerHeight as number)) {
        this.canvas.setHeight(window.innerHeight as number);
        image.scaleToHeight(this.canvas.height as number);
        this.canvas.setWidth(image.getScaledWidth() as number)
      }
    }

    // Hauteur image > longeur image
    if ((image.height as number) > (image.width as number)) {
      this.canvas.setHeight(document.getElementById("editionCol")?.clientHeight as number);
      image.scaleToHeight(this.canvas.height as number);
      this.canvas.setWidth(image.getScaledWidth() as number)

      if ((image.getScaledWidth() as number) > (document.getElementById("editionCol")?.clientWidth as number)) {
        this.canvas.setWidth(document.getElementById("editionCol")?.clientWidth as number);
        image.scaleToWidth(this.canvas.width as number);
        this.canvas.setHeight(image.getScaledHeight() as number)
      }

      if ((image.getScaledHeight() as number) > (window.innerHeight as number)) {
        this.canvas.setHeight(window.innerHeight as number);
        image.scaleToHeight(this.canvas.height as number);
        this.canvas.setWidth(image.getScaledWidth() as number)
      }
    }
  }

  // Zoomer le canvas
  zoomerImage() {
    this.canvas.on('mouse:wheel', (opt) => {
      var delta = opt.e.deltaY;
      var zoom = this.canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 1) {
        zoom = 1;
        this.recentrerImage();
      }
      this.canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });
  }

  // Recentrer la caméra
  recentrerImage() {
    this.canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
  }
  //#endregion


}
