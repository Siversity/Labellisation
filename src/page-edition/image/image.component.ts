import { Component, OnInit } from '@angular/core';
const url = 'assets/images/cutecat.jpg'

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  lien: string = url;

  constructor() { }

  ngOnInit(): void {
  }

}
