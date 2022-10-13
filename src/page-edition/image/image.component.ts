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
    this.canvas = new fabric.Canvas("canvas", {})

    // Import de l'image dans le canvas
    fabric.Image.fromURL(this.lienImage, (image) => {

      // Image non déplaçable
      image.selectable = false;

      this.resizeCanvas(image);

      // Responsive
      window.addEventListener('resize', () => { this.resizeCanvas(image) })

      this.canvas.add(image);
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
