import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { fabric } from 'fabric';
import { textureSize } from 'fabric/fabric-impl';
import { Etiquette } from 'src/Etiquette';


@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})

export class ImageComponent implements OnInit {

  // Variables
  boutonAjouterEtiquette: boolean = false;
  curseurSurEtiquette: boolean = false;
  lienImage: string = 'assets/images/cutecats2.jpg';
  lienJSON: string = 'assets/jsons/cutecats2.json';
  canvas: fabric.Canvas = new fabric.Canvas("canvas", {});


  // Constructeur
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
    this.canvas.defaultCursor = "Handwriting";

    // Création du canvas et import de l'image
    this.importerImage();

    // Chargement des étiquettes
    this.chargerEtiquettes();
  }

  // Lorsque le composant est initialisé
  ngAfterContentInit() {
    this.ajouterEtiquette();
    this.zoomerImage();
    this.limiterEtiquettes();
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


  // Vérificateur d'ajout d'une étiquette
  ajoutEtiquettePossible(): boolean {
    // Si le bouton d'ajout a été sélectionné et le curseur n'est pas sur une étiquette déjà existante
    if (this.boutonAjouterEtiquette == true && this.curseurSurEtiquette == false) {
      return true;
    }
    else {
      return false;
    }
  }
  //#endregion


  /////////////////////////////
  // CREATION DES ETIQUETTES //
  /////////////////////////////
  //#region 
  // Création d'une étiquette
  creerEtiquette(origX: number, origY: number, tailleX: number, tailleY: number) {
    // Initialisation de l'étiquette
    let etiquette: fabric.Rect = new fabric.Rect({
      left: origX,
      top: origY,
      originX: 'left',
      originY: 'top',
      width: tailleX,
      height: tailleY,
      angle: 0,
      fill: 'rgba(255,0,0,0.5)',
      transparentCorners: false
    });

    // Désactivation de la possibilité de rotation de l'étiquette
    etiquette.setControlsVisibility({ mtr: false });

    // Ajout de l'étiquette au canvas
    this.canvas.add(etiquette);

    // Envoi de l'étiquette
    return etiquette;
  }

  // Création d'un étiquette via la souris
  ajouterEtiquette() {
    // Initialisation des variables
    var mouseIsDown: boolean; // Etat de la souris
    var etiquette: fabric.Rect;
    var origX: number; // Position X
    var origY: number; // Position Y

    // Lorsque le clic de la souris est maintenu
    this.canvas.on('mouse:down', (o) => {
      if (this.ajoutEtiquettePossible()) {
        mouseIsDown = true;
        var pointer = this.canvas.getPointer(o.e);
        origX = pointer.x;
        origY = pointer.y;
        var pointer = this.canvas.getPointer(o.e);

        // Création de l'étiquette
        etiquette = this.creerEtiquette(origX, origY, pointer.x - origX, pointer.y - origY);

        // Sélectionner l'étiquette nouvellement créée
        this.canvas.setActiveObject(etiquette);
      }

      // Lorsque l'on bouge la souris
      this.canvas.on('mouse:move', (o) => {
        if (this.boutonAjouterEtiquette == true) {
          if (!mouseIsDown) return;
          var pointer = this.canvas.getPointer(o.e);

          if (origX > pointer.x) {
            etiquette.set({ left: Math.abs(pointer.x) });
          }
          if (origY > pointer.y) {
            etiquette.set({ top: Math.abs(pointer.y) });
          }

          etiquette.set({ width: Math.abs(origX - pointer.x) });
          etiquette.set({ height: Math.abs(origY - pointer.y) });

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
      .then((listeEtiquettes: Etiquette[]) => {
        // On affiche chaque étiquette
        listeEtiquettes.forEach((etiquetteJSON: any) => {

          console.log(etiquetteJSON)

          // Création de l'objet
          let etiquette: fabric.Rect = this.creerEtiquette(etiquetteJSON.box[0], etiquetteJSON.box[1], etiquetteJSON.box[2], etiquetteJSON.box[3]);

          console.log(etiquette)
          // On ajoute l'étiquette au canvas
          this.canvas.add(etiquette);
        })
      }).catch(function () {
        console.log("Impossible de charger les étiquettes");
      });
  }
  //#endregion


  ////////////////////////////
  // GESTION DES ETIQUETTES //
  ////////////////////////////
  //#region
  // Supprimer les étiquettes sélectionnées
  supprimerEtiquette() {
    this.canvas.getActiveObjects().forEach(etiquette => {
      this.canvas.remove(etiquette);
    })
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
    let listeEtiquettesJSON: Etiquette[] = [];

    // Pour chaque étiquette, on crée un JSON
    this.canvas.getObjects().forEach((etiquette: fabric.Object) => {
      if (etiquette.type != "image") {

        // Création de l'étiquette
        let etiquetteJSON: Etiquette = {
          box: [etiquette.left, etiquette.top, etiquette.width, etiquette.height],
          text: "Test",
          class: "Test"
        }

        // On ajoute l'étiquette dans notre liste
        listeEtiquettesJSON.push(etiquetteJSON);
      }
    })

    console.log(JSON.stringify(listeEtiquettesJSON));
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
      window.addEventListener('resize', () => { this.tailleImage(image) })

      // Affichage de l'image
      this.canvas.add(image);
    });
  }

  // Fonction pour afficher l'image de manière responsive
  tailleImage(image: fabric.Object): void {
    // Longeur image > hauteur image
    if ((image.width as number) > (image.height as number)) {
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
