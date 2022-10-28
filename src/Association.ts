import { Etiquette } from "./Etiquette";

export class Association {

    // Attributs
    rect: fabric.Rect;
    json: Etiquette;


    // Constructeur
    constructor(rect: fabric.Rect, json: Etiquette) {
        this.rect = rect;
        this.json = json;
    }


}