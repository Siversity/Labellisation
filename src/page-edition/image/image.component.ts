import { Component, Input, OnInit } from '@angular/core';
import { fabric } from 'fabric';
import { Association } from 'src/Association';
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
  @Input() imageEnvoyerInfoVersPageEdition: (Etiquette: Etiquette) => void;
  //@ts-ignore
  @Input() imageEnvoyerListeEtiquettesVersPageEdition: (Etiquettes: Etiquette[]) => void;

  // Stockage du canvas utilisé
  canvas: fabric.Canvas = new fabric.Canvas("canvas", {});
  listeEtiquettes: Association[] = [];

  // Gestion des évènements d'ajout
  boutonAjouterEtiquette: boolean = false;
  curseurSurEtiquette: boolean = false;

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
    this.chargerEtiquettes();
  }

  // Lorsque le composant est initialisé
  ngAfterContentInit() {
    // Ajout des fonctionnalités d'édition
    this.ajouterEtiquette();
    this.limiterEtiquettes();
    this.zoomerImage();
  }
  //#endregion


  ///////////////////////////
  // GESTION DES VARIABLES //
  ///////////////////////////
  //#region
  // Gestion de l'ajout d'une étiquette
  activerAjoutEtiquette() {
    // Activer l'ajout d'une étiquette
    this.boutonAjouterEtiquette = true;

    // Désactiver la sélection des autres étiquettes
    this.canvas.selection = false;
  }
  //#endregion


  /////////////////////////////
  // CREATION DES EtiquetteS //
  /////////////////////////////
  //#region 

  // Création d'un étiquette via la souris
  ajouterEtiquette() {
    // Initialisation des variables
    var mouseIsDown: boolean; // Etat de la souris
    var association: Association;
    var etiquette: fabric.Rect;
    var origX: number; // Position X
    var origY: number; // Position Y

    // Lorsque le clic de la souris est maintenu
    this.canvas.on('mouse:down', (o) => {

      // Mise à jour du pointer (souris)
      var pointer = this.canvas.getPointer(o.e);
      origX = pointer.x;
      origY = pointer.y;
      var pointer = this.canvas.getPointer(o.e);

      if (this.boutonAjouterEtiquette == true && this.curseurSurEtiquette == false) {
        mouseIsDown = true;

        association = new Association(
          this.canvas, // canvas
          "", // texte
          "", // classe
          origX, // origX
          origY, // origY
          pointer.x - origX, // tailleX
          pointer.y - origY, // tailleY
        )

        // Récupération du fabric.Rect
        etiquette = association.getRect();

        // Ajouter les évènements d'affichage des infos
        this.ajouterEvenementAffichageInformations(etiquette, "", "");

        // Actualiser la liste d'étiquettes de sidebar droite
        this.evenementEnvoyerListeEtiquettes(this.canvas.getObjects() as any);

        // Sélectionner l'étiquette nouvellement créée
        this.canvas.setActiveObject(etiquette);
      }

      // Lorsque l'on bouge la souris
      this.canvas.on('mouse:move', (o) => {
        if (this.boutonAjouterEtiquette == true) {
          if (!mouseIsDown) return;
          var pointer = this.canvas.getPointer(o.e);

          console.log(pointer)

          if (origX > pointer.x) {
            association.setRectLeft(Math.abs(pointer.x))
            //etiquette.set({ left: Math.abs(pointer.x) });
          }
          if (origY > pointer.y) {
            association.setRectTop(Math.abs(pointer.y))
            //etiquette.set({ top: Math.abs(pointer.y) });
          }

          association.setRectWidth(Math.abs(origX - pointer.x))
          association.setRectHeight(Math.abs(origY - pointer.y))
          //etiquette.set({ width: Math.abs(origX - pointer.x) });
          //etiquette.set({ height: Math.abs(origY - pointer.y) });

          // Ajouter les évènements d'affichage des infos
          this.ajouterEvenementAffichageInformations(etiquette, "", "");

          this.canvas.renderAll();
        }
      });

      // Lorsque le clic de la souris est relevé
      this.canvas.on('mouse:up', (o) => {
        if (this.boutonAjouterEtiquette == true && this.curseurSurEtiquette == false) {
          mouseIsDown = false;
          this.boutonAjouterEtiquette = false;

          // Réactiver sélection 
          this.canvas.selection = true;

          // Ajouter les évènements d'affichage des infos
          var etiquetteJSON: EtiquetteJSON = {
            box: [origX, origY, pointer.x - origX, pointer.y - origY],
            text: "",
            class: ""
          }
          this.ajouterEvenementsEtiquettes(association.getRect(), association.getJson());

          // Ajouter les évènements d'hover à l'étiquette
          etiquette.on("mouseover", (o) => {
            this.curseurSurEtiquette = true;
          })
          etiquette.on("mouseout", (o) => {
            this.curseurSurEtiquette = false;
          })
        }
      });
    });
  }

  // Création des étiquettes déjà existantes
  chargerEtiquettes() {
    // On récupère le JSON existant
    fetch(this.lienJSON).then((data: Response) => data.json())
      .then((listeEtiquettes: EtiquetteJSON[]) => {
        // On affiche chaque étiquette
        listeEtiquettes.forEach((etiquetteJSON: any) => {

          let ratio: number = this.canvas.getObjects()[0].scaleX as number;

          // Création de l'objet
          let association: Association = new Association(
            this.canvas,
            etiquetteJSON.text,
            etiquetteJSON.class,
            etiquetteJSON.box[0],
            etiquetteJSON.box[1],
            etiquetteJSON.box[2],
            etiquetteJSON.box[3],
          )

          // Obtention des variables
          let rect: fabric.Rect = association.getRect();
          let json: EtiquetteJSON = association.getJson();
          // Ajouter les évènements d'affichage des infos
          this.ajouterEvenementsEtiquettes(rect, json);

          // Ajouter les évènements d'hover à l'étiquette
          rect.on("mouseover", (o) => {
            this.curseurSurEtiquette = true;
          })
          rect.on("mouseout", (o) => {
            this.curseurSurEtiquette = false;
          })
        })

        // Actualiser la liste d'étiquettes dans sidebar Droite
        this.evenementEnvoyerListeEtiquettes(this.canvas.getObjects() as any);

      }).catch(function () {
        console.log("Impossible de charger les étiquettes");
      });
  }


  // Fonction d'ajout des évènements d'affichage des infos
  ajouterEvenementsEtiquettes(etiquette: fabric.Rect, etiquetteJSON: EtiquetteJSON) {
    // On ajoute l'événement de sélection de l'étiquette
    etiquette.on('scaling', () => {
      this.ajouterEvenementAffichageInformations(etiquette, etiquetteJSON.text, etiquetteJSON.class);
    })
    etiquette.on('selected', () => {
      this.ajouterEvenementAffichageInformations(etiquette, etiquetteJSON.text, etiquetteJSON.class);
    })
    etiquette.on('moving', () => {
      this.ajouterEvenementAffichageInformations(etiquette, etiquetteJSON.text, etiquetteJSON.class);
    })
  }


  // Fonction d'affichage des informations vers la SidebarDroite
  ajouterEvenementAffichageInformations(etiquette: fabric.Rect, texte: string, classe: string) {
    // Récupération du ratio de l'image
    let ratio: number = this.canvas.getObjects()[0].scaleX as number;

    // Création de l'objet Etiquette à afficher sur la SidebarDroite
    let etiquetteJSON: EtiquetteJSON = {
      //box: [Etiquette.left as number / ratio, Etiquette.top as number / ratio, Etiquette.width as number / ratio, Etiquette.height as number / ratio],
      //@ts-ignore
      box: [etiquette.left as number / ratio, etiquette.top as number / ratio, (etiquette.width * etiquette.scaleX) as number / ratio, (etiquette.height * etiquette.scaleY) as number / ratio],
      text: texte,
      class: classe
    }

    // Envoi de l'étiquette vers la SidebarDroite
    this.imageEnvoyerInfoVersPageEdition(etiquetteJSON);
  }

  evenementEnvoyerListeEtiquettes(etiquette: fabric.Rect[]) {
    // Récupération du ratio de l'image
    let ratio: number = this.canvas.getObjects()[0].scaleX as number;
    let list: any = Array();


    for (let i = 1; i < etiquette.length; i++) {
      let etiquetteJSON: EtiquetteJSON = {
        //@ts-ignore
        box: [etiquette[i].left as number / ratio, etiquette[i].top as number / ratio, (etiquette[i].width * etiquette[i].scaleX) as number / ratio, (etiquette[i].height * etiquette[i].scaleY) as number / ratio],
        text: i.toString(),
        class: i.toString()
      }

      list.push(etiquetteJSON);
    }

    // Envoi de l'étiquette vers la SidebarDroite
    this.imageEnvoyerListeEtiquettesVersPageEdition(list);
  }
  //#endregion


  ////////////////////////////
  // GESTION DES EtiquetteS //
  ////////////////////////////
  //#region
  // Supprimer les étiquettes sélectionnées
  supprimerEtiquette() {
    this.canvas.getActiveObjects().forEach(etiquette => {
      this.canvas.remove(etiquette);
    })
    this.evenementEnvoyerListeEtiquettes(this.canvas.getObjects());
  }

  // Limite des étiquettes
  limiterEtiquettes() {
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
  sauvegarderEtiquettes(): void {
    console.log("Début de la sauvegarde des étiquettes");

    // On initialise une liste vide qui va contenir le JSON de chaque étiquette
    let listeEtiquettesJSON: EtiquetteJSON[] = [];

    // On récupère le ratio de l'image
    let ratio = this.canvas.getObjects()[0].scaleX;

    // Pour chaque étiquette, on crée un JSON
    this.canvas.getObjects().forEach((etiquette: fabric.Object) => {
      if (etiquette.type != "image") {
        // Création de l'étiquette
        let etiquetteJSON: EtiquetteJSON = {
          //@ts-ignore
          box: [etiquette.left / ratio, etiquette.top / ratio, etiquette.getScaledWidth() / ratio, etiquette.getScaledHeight() / ratio],
          text: "Test",
          class: "Test"
        }

        // On ajoute l'étiquette dans notre liste
        listeEtiquettesJSON.push(etiquetteJSON);
      }
    })

    console.log(JSON.stringify(listeEtiquettesJSON));
  }

  // Fonction pour actualiser les étiquettes
  actualiserEtiquette(texte: string, classe: string, coordX: number, coordY: number, tailleX: number, tailleY: number) {

    // Si aucun objet n'est sélectionné, ne rien faire
    if (this.canvas.getActiveObjects().length == 0) {
      return;
    }

    // Récupération des données de calcul
    let img: any = this.canvas.getObjects()[0];
    let etiquette: fabric.Object = this.canvas.getActiveObjects()[0];
    let ratio: number = img.scaleX as number;

    // Calcul de la taille des étiquettes à afficher
    etiquette.left = coordX * ratio;
    etiquette.top = coordY * ratio;
    etiquette.width = (tailleX * ratio) / (etiquette.scaleX as number);
    etiquette.height = (tailleY * ratio) / (etiquette.scaleY as number);

    console.log((tailleX * (etiquette.scaleX as number)))

    if ((etiquette.left) + (tailleX * (etiquette.scaleX as number)) >= img.width) {
      console.log("1er if")
      etiquette.left = img.width - (tailleX * (etiquette.scaleX as number));
    }
    if (etiquette.left as number <= 0) {
      console.log("2ème if")
      etiquette.left = 0;
    }
    if ((etiquette.top) + (tailleY * (etiquette.scaleY as number)) >= img.height) {
      console.log("3ème if")
      etiquette.top = img.width - (tailleY * (etiquette.scaleY as number));
    }
    if (etiquette.top <= 0) {
      console.log("4ème if")
      etiquette.top = 0;
    }

    // Render des étiquettes
    this.canvas.renderAll();

    this.ajouterEvenementAffichageInformations(etiquette, texte, classe)

    // Réinitialisation du scale des étiquettes
    etiquette.scaleX = 1;
    etiquette.scaleY = 1;
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
      window.addEventListener('resize', () => { this.tailleImage(image), this.tailleEtiquettes() })

      // Affichage de l'image
      this.canvas.add(image);
    });
  }

  // Fonction pour afficher les Etiquettes de manière responsive
  tailleEtiquettes() {

    // Calcul du ratio de l'image
    let ratio: number = this.canvas.getObjects()[0].scaleX as number;

    // Redimensionnement pour chaque Etiquette
    this.canvas.getObjects().forEach((etiquette: fabric.Object) => {

      if (etiquette.type != 'image') {

        // Origine
        etiquette.top = 100 * ratio;
        etiquette.left = 100 * ratio;

        // Taille
        etiquette.scaleToWidth(100 * ratio);
        etiquette.scaleToHeight(100 * ratio);
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
