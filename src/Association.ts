import { EtiquetteJSON } from "./Etiquette";

export class Association {

    // Attributs
    rect: fabric.Rect;
    json: EtiquetteJSON;


    // Constructeur
    constructor(rect: fabric.Rect, json: EtiquetteJSON) {
        this.rect = rect;
        this.json = json;
    }


    // Getters
    getRect() {
        return this.rect;
    }

    // Setters
    setRect(rectangle : fabric.Rect) {
        this.rect = rectangle;
    }
    




}