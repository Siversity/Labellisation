import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { fabric } from 'fabric';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})

export class ImageComponent implements OnInit {

  // Variables
  @Input() boutonAjouterEtiquette: boolean = false;
  curseurSurEtiquette: boolean = false;
  lienImage: string = 'assets/images/cutecats2.jpg';
  lienJSON: string = 'assets/jsons/cutecats2.json';
  canvas: fabric.Canvas = new fabric.Canvas("canvas", {});
  
  httpClient: HttpClient | undefined;


  // Constructeur
  constructor() { }


  // OnInit
  ngOnInit(): void {
    // Création d'un canvas vide
    this.canvas = new fabric.Canvas("canvas", {
      uniformScaling: false
    });
    this.canvas.defaultCursor = "Handwriting";

    // Ajout des fonctionnalités
    this.importerImage();
    this.ajouterEtiquette();
    this.zoomer();
    this.limiterEtiquettes();
  }


  // Bouton d'ajout d'une étiquette
  modifierStatutEtiquette() {
    // Activer l'ajout d'une étiquette
    this.boutonAjouterEtiquette = true;

    // Désactiver la sélection des autres étiquettes
    this.canvas.selection = false;
  }


  // Fonction d'import des images
  importerImage(): void {
    fabric.Image.fromURL(this.lienImage, (image) => {

      // Propriétés de l'image
      image.selectable = false;
      image.hoverCursor = "pointer"

      // Responsive
      this.resizeCanvas(image);
      window.addEventListener('resize', () => { this.resizeCanvas(image) })

      // Affichage de l'image
      this.canvas.add(image);
    });
  }


  // Fonction pour afficher l'image de manière responsive
  resizeCanvas(image: fabric.Object): void {
    // Mise à jour des dimensions du canvas en fonction de la taille de l'image
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


  // Fonction d'ajout des étiquettes
  ajouterEtiquette() {
    // Initialisation des variables
    // Taille du rectangle
    var rect: fabric.Rect;

    // Evenement souris
    var isDown: boolean;

    // Origine X
    var origX: number;

    // Origine Y
    var origY: number;


    // Lorsque le clic de la souris est maintenu
    this.canvas.on('mouse:down', (o) => {
      if (this.boutonAjouterEtiquette == true && this.curseurSurEtiquette == false) {
        isDown = true;
        var pointer = this.canvas.getPointer(o.e);
        origX = pointer.x;
        origY = pointer.y;
        var pointer = this.canvas.getPointer(o.e);
        rect = new fabric.Rect({
          left: origX,
          top: origY,
          originX: 'left',
          originY: 'top',
          width: pointer.x - origX,
          height: pointer.y - origY,
          angle: 0,
          fill: 'rgba(255,0,0,0.5)',
          transparentCorners: false
        });
        rect.setControlsVisibility({ mtr: false });

        // Ajouter l'étiquette au canvas
        this.canvas.add(rect);

        // Sélectionner l'objet nouvellement ajouté
        this.canvas.setActiveObject(rect);
      }


      // Lorsque l'on bouge la souris
      this.canvas.on('mouse:move', (o) => {
        if (this.boutonAjouterEtiquette == true) {
          if (!isDown) return;
          var pointer = this.canvas.getPointer(o.e);

          if (origX > pointer.x) {
            rect.set({ left: Math.abs(pointer.x) });
          }
          if (origY > pointer.y) {
            rect.set({ top: Math.abs(pointer.y) });
          }

          rect.set({ width: Math.abs(origX - pointer.x) });
          rect.set({ height: Math.abs(origY - pointer.y) });

          this.canvas.renderAll();
        }
      });


      // Lorsque le clic de la souris est relevé
      this.canvas.on('mouse:up', (o) => {
        if (this.boutonAjouterEtiquette == true && this.curseurSurEtiquette == false) {
          isDown = false;
          this.boutonAjouterEtiquette = false;

          // Réactiver sélection 
          this.canvas.selection = true;

          // Ajouter les évènements d'hover à l'étiquette
          rect.on("mouseover", (o) => {
            this.curseurSurEtiquette = true;
          })
          rect.on("mouseout", (o) => {
            this.curseurSurEtiquette = false;
          })
        }
      });
    });
  }


  // Supprimer les étiquettes sélectionnées
  supprimerEtiquette() {
    this.canvas.getActiveObjects().forEach(etiquette => {
      this.canvas.remove(etiquette);
    })
  }


  // Zoomer le canvas
  zoomer() {
    this.canvas.on('mouse:wheel', (opt) => {
      var delta = opt.e.deltaY;
      var zoom = this.canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 1) {
        zoom = 1;
        this.recentrerCamera();
      }
      this.canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });
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


  // Recentrer la caméra
  recentrerCamera() {
    this.canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
  }


  afficherPositionEtiquette() {
    /*
    this.canvas.on("mouse:move", (o) => {
      let pointer = this.canvas.getPointer(o.e);
      let posX = pointer.x;
      let posY = pointer.y;
      console.log("(" + posX + ", " + posY + ")" );
    })
    */
    console.log("Point : (" + Math.round(this.canvas.getObjects()[1].left as number) + ", " + Math.round(this.canvas.getObjects()[1].top as number) + ")");
    console.log("Taille : " + Math.round(this.canvas.getObjects()[1].width as number) + "x" + Math.round(this.canvas.getObjects()[1].height as number));
  }


  // Lorsque le composant est initialisé
  ngAfterContentInit() {

    // On récupère le JSON existant
    fetch(this.lienJSON).then(data => data.json())
      .then(listeEtiquettes => {

        console.log(listeEtiquettes)

        // On affiche chaque étiquette
        listeEtiquettes.forEach((etiquette: any) => {

          // Création de l'objet
          let rect = new fabric.Rect({
            left: etiquette.box[0],
            top: etiquette.box[1],
            originX: 'left',
            originY: 'top',
            width: etiquette.box[2],
            height: etiquette.box[3],
            angle: 0,
            fill: 'rgba(255,0,0,0.5)',
            transparentCorners: false
          });

          // On désactive la rotation de l'objet
          rect.setControlsVisibility({ mtr: false });

          // On ajoute l'étiquette au canvas
          this.canvas.add(rect);
        })
      }).catch(function () {
        console.log("error");
      });
  }
}
