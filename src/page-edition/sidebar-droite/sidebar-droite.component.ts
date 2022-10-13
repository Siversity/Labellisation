import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-droite',
  templateUrl: './sidebar-droite.component.html',
  styleUrls: ['./sidebar-droite.component.css']
})
export class SidebarDroiteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

  test() {
    alert("TODO : Sauvegarder les modifs")
  }

  saveChanges(){
    alert("TODO : Sauvegarder en JSON les modifications");
  }

  loadLabelInformations(e : any) {
    var label : any = e.target;
    alert("TODO : Récupérer et charger les infos du label" + label.id + " (titre, position, taille)");
  }


}
