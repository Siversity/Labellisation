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
  @Input() imageEnvoyerInfoVersPageEdition: (Etiquette: Etiquette, id: string) => void;
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

  // Génération d'un ID aléatoire unique
  getAssociationById(id : string) : Association | undefined {
    for (let i = 0; i < this.listeEtiquettes.length; i++) {
      if (this.listeEtiquettes[i].id == id) {
        return this.listeEtiquettes[i]
      }
    }

    return;
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

        // Ajouter les évènements d'affichage des infos
        this.ajouterEvenementsEtiquettes(association);

        // Actualiser la liste d'étiquettes de sidebar droite
        this.evenementEnvoyerListeEtiquettes(this.canvas.getObjects() as any);

        // Ajout de l'étiquette dans la liste des étiquettes de l'image
        this.listeEtiquettes.push(association);

        // Sélectionner l'étiquette nouvellement créée
        this.canvas.setActiveObject(association.getRect());
      }

      // Lorsque l'on bouge la souris
      this.canvas.on('mouse:move', (o) => {
        if (this.boutonAjouterEtiquette == true) {
          if (!mouseIsDown) return;
          var pointer = this.canvas.getPointer(o.e);

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
          association.modifierJSONFromRect(this.canvas.getObjects()[0].scaleX as number);
          this.imageEnvoyerInfoVersPageEdition(association.getJson(), association.getId());
          

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

          // Modification du JSON
          association.modifierJSONFromRect(this.canvas.getObjects()[0].scaleX as number);

          // Tracking de l'information
          this.ajouterEvenementsEtiquettes(association);

          // Ajouter les évènements d'hover à l'étiquette
          association.getRect().on("mouseover", (o) => {
            this.curseurSurEtiquette = true;
          })
          association.getRect().on("mouseout", (o) => {
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
            etiquetteJSON.box[0] * ratio,
            etiquetteJSON.box[1] * ratio,
            etiquetteJSON.box[2] * ratio,
            etiquetteJSON.box[3] * ratio,
          )

          // Obtention des variables
          let rect: fabric.Rect = association.getRect();
          this.listeEtiquettes.push(association);

          // Ajouter les évènements d'affichage des infos
          this.ajouterEvenementsEtiquettes(association);

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
  ajouterEvenementsEtiquettes(association: Association) {
    // Ratio de l'image
    let ratio: number = this.canvas.getObjects()[0].scaleX as number;

    // On ajoute l'événement de sélection de l'étiquette
    association.getRect().on('scaling', () => {
      association.modifierJSONFromRect(ratio);
      this.imageEnvoyerInfoVersPageEdition(association.getJson(), association.getId());
    })
    association.getRect().on('selected', () => {
      this.imageEnvoyerInfoVersPageEdition(association.getJson(), association.getId());
    })
    association.getRect().on('moving', () => {
      association.modifierJSONFromRect(ratio);
      this.imageEnvoyerInfoVersPageEdition(association.getJson(), association.getId());
    })
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
    this.canvas.getActiveObjects().forEach((rect: fabric.Rect) => {
      // Récupération de l'association à supprimer en focntion de son fabric.Rect
      let index: number = this.listeEtiquettes.findIndex((association: Association) => {
        return association.getRect() == rect;
      })

      // Suppression de l'association de la liste des étiquettes
      this.listeEtiquettes.splice(index, 1);

      // Suppression du fabric.Rect du canvas
      this.canvas.remove(rect);
    })
    
    // Mise à jour de la liste des étiquettes à afficher sur la SidebarDroite
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

    // Pour chaque étiquette, on crée un JSON
    this.listeEtiquettes.forEach((etiquette: Association) => {
      if (etiquette.getRect().type != "image") {
        // On ajoute l'étiquette
        listeEtiquettesJSON.push(etiquette.getJson())
      }
    })

    console.log(JSON.stringify(listeEtiquettesJSON));
  }

  // Fonction pour actualiser les étiquettes
  actualiserEtiquette(json : EtiquetteJSON, id : string) {

    // Si aucun objet n'est sélectionné, ne rien faire
    if (this.canvas.getActiveObjects().length == 0) {
      return;
    }

    // Récupération des données de calcul
    let image: fabric.Image = this.canvas.getObjects()[0] as fabric.Image;
    let association : any = this.getAssociationById(id);

    // Calcul de la taille des étiquettes à afficher
    association.setJson(json);
    association.modifierRectFromJSON(image.scaleX as number);

    // etiquette.left = coordX * ratio;
    // etiquette.top = coordY * ratio;
    // etiquette.width = (tailleX * ratio) / (etiquette.scaleX as number);
    // etiquette.height = (tailleY * ratio) / (etiquette.scaleY as number);

    // console.log((tailleX * (etiquette.scaleX as number)))
    /*
    if ((association.getRect().left as number) + (association.getJson().box[2] * (association.getRect().scaleX as number)) >= (image.width as number)) {
      console.log("1er if")
      association.getRect().left = (image.width as number) - (association.getJson().box[2] * (association.getRect().scaleX as number));
    }
    if (association.getRect().left as number <= 0) {
      console.log("2ème if")
      association.getRect().left = 0;
    }
    if ((association.getRect().top as number) + (association.getJson().box[3] * (association.getRect().scaleY as number)) >= (image.height as number)) {
      console.log("3ème if")
      association.getRect().top = (image.width as number)- (association.getJson().box[3] * (association.getRect().scaleY as number));
    }
    if (association.getRect().top as number <= 0) {
      console.log("4ème if")
      association.getRect().top = 0;
    }
    */

    // if ((etiquette.left) + (tailleX * (etiquette.scaleX as number)) >= img.width) {
    //   console.log("1er if")
    //   etiquette.left = img.width - (tailleX * (etiquette.scaleX as number));
    // }
    // if (etiquette.left as number <= 0) {
    //   console.log("2ème if")
    //   etiquette.left = 0;
    // }
    // if ((etiquette.top) + (tailleY * (etiquette.scaleY as number)) >= img.height) {
    //   console.log("3ème if")
    //   etiquette.top = img.width - (tailleY * (etiquette.scaleY as number));
    // }
    // if (etiquette.top <= 0) {
    //   console.log("4ème if")
    //   etiquette.top = 0;
    // }

    // Render des étiquettes
    this.canvas.renderAll();

    this.ajouterEvenementsEtiquettes(association)

    // Réinitialisation du scale des étiquettes
    association.getRect().scaleX = 1;
    association.getRect().scaleY = 1;
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
