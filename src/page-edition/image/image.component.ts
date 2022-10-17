import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})

export class ImageComponent implements OnInit {

  // Variables
  lienImage: string = 'assets/images/cutecats2.jpg';
  canvas: fabric.Canvas = new fabric.Canvas("canvas", {});
  boutonAjouterEtiquette: boolean = false;
  curseurSurEtiquette: boolean = false;


  // Constructeur
  constructor() { }


  // OnInit
  ngOnInit(): void {

    // Création d'un canvas vide
    this.canvas = new fabric.Canvas("canvas", {});
    this.canvas.defaultCursor = "Handwriting";

    // Ajout des fonctionnalités
    this.importerImage();
    this.ajouterEtiquette();
    this.zoomer();
  }


  // Bouton d'ajout d'une étiquette
  modifierStatutEtiquette() {
    this.boutonAjouterEtiquette = true;
    console.log(this.ajouterEtiquette)
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
  resizeCanvas(image: fabric.Image): void {
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

        // Ajouter l'étiquette au canvas
        this.canvas.add(rect);
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

          // Ajouter les évènement d'hover à l'étiquette
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

  recentrerCamera() {
    this.canvas.setViewportTransform([1,0,0,1,0,0]);
  }
}
