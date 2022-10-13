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

  constructor() { }

  ngOnInit(): void {

    // Création d'un canvas vide
    this.canvas = new fabric.Canvas("canvas", {});
    this.canvas.defaultCursor = "Handwriting";

    // Import de l'image dans le canvas
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

    var rect: fabric.Rect;
    var isDown: boolean;
    var origX: number;
    var origY: number;

    this.canvas.on('mouse:down', (o) => {
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
        width: pointer.x-origX,
        height: pointer.y-origY,
        angle: 0,
        fill: 'rgba(255,0,0,0.5)',
        transparentCorners: false
    });
    this.canvas.add(rect);

    this.canvas.on('mouse:move', (o) => {
      if (!isDown) return;
      var pointer = this.canvas.getPointer(o.e);
  
      if(origX>pointer.x){
          rect.set({ left: Math.abs(pointer.x) });
      }
      if(origY>pointer.y){
          rect.set({ top: Math.abs(pointer.y) });
      }
  
      rect.set({ width: Math.abs(origX - pointer.x) });
      rect.set({ height: Math.abs(origY - pointer.y) });
  
  
      this.canvas.renderAll();
  });
  
  this.canvas.on('mouse:up', (o) => {
    isDown = false;
  });
});


    /*
    // Chargement de la zone d'édition
    let canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
    let img: HTMLImageElement = new Image;

    // Sélection de l'image
    img.src = this.lienImage;

    // Chargement de l'image
    img.onload = function (): void {

      // Modification de la zone d'édition
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    }
    */
  }


  resizeCanvas(image: fabric.Image): void {
    console.log("Resizing")
    // Mise à jour des dimensions du canvas en fonction de la taille de l'image

    // Longeur image > hauteur image
    if ((image.width as number) > (image.height as number)) {
      console.log("CASE A");
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
      console.log("CASE B");
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

}
