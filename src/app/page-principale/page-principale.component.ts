import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { getListeNomImages } from 'src/api/getListeNomImages';


@Component({
  selector: 'app-page-principale',
  templateUrl: './page-principale.component.html',
  styleUrls: ['./page-principale.component.css']
})
export class PagePrincipaleComponent implements OnInit {

  ///////////////
  // VARIABLES //
  ///////////////
  listeImages: any = []
  


  //////////////////
  // CONSTRUCTEUR //
  //////////////////
  constructor(private elementRef: ElementRef, private location: Location, private router: Router) { }


  /////////////////////////
  // FONCTIONS PRIMAIRES //
  /////////////////////////
  //#region
  // A l'initialisation
  async ngOnInit() {
    this.listeImages = await getListeNomImages();
  }

  ngOndestroy() {
    this.elementRef.nativeElement.remove();
  }
  //#endregion

}

