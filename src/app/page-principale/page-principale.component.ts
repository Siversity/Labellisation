import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-page-principale',
  templateUrl: './page-principale.component.html',
  styleUrls: ['./page-principale.component.css']
})
export class PagePrincipaleComponent implements OnInit {

  ///////////////
  // VARIABLES //
  ///////////////
  listeImages: string[] = [
    "cutecats1.jpg",
    "cutecats2.jpg",
    "cutecats3.jpg",
    "cutecats4.jpg",
    "cutecats5.jpg"
  ]
  


  //////////////////
  // CONSTRUCTEUR //
  //////////////////
  constructor(private elementRef: ElementRef, private location: Location, private router: Router) { }


  /////////////////////////
  // FONCTIONS PRIMAIRES //
  /////////////////////////
  //#region
  // A l'initialisation
  ngOnInit(): void {
  }

  ngOndestroy() {
    this.elementRef.nativeElement.remove();
  }
  //#endregion

}

