import { setUserProjection } from "ol/proj";
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

    getJson(){
        return this.json;
    }

    // Setters
    setRect(rectangle : fabric.Rect) {
        this.rect = rectangle;
    }


    setJson(newJson : EtiquetteJSON){
        this.json = newJson;
    }

    setJsonBox(jsonBox : number[] ){
        this.json = {
            box: jsonBox,
            text: this.json.text,
            class: this.json.class
        };
    }

    setJsonText(jsonText : string ){
        this.json = {
            box: this.json.box,
            text: jsonText,
            class: this.json.class
        };
    }

    setJsonClass(jsonClass : string ){
        this.json = {
            box: this.json.box,
            text: this.json.text,
            class: jsonClass
        };
    }


}