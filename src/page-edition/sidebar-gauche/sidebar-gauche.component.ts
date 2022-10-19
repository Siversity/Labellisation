import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar-gauche',
  templateUrl: './sidebar-gauche.component.html',
  styleUrls: ['./sidebar-gauche.component.css']
})

export class SidebarGaucheComponent implements OnInit {

  @Output() onAjoutEtiquette = new EventEmitter<any>();

  ajoutEtiquette(value : any) {
    this.onAjoutEtiquette.emit(value);
    console.log(value)
  }


  constructor() { }

  ngOnInit(): void {
  }

}
