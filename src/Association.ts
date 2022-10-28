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

    //#region 
    // Getters
    getRect() {
        return this.rect;
    }

    getJson(){
        return this.json;
    }
    //#endregion


    //#region 
    // Setters
    setRect(rectangle : fabric.Rect) {
        this.rect = rectangle;
    }


    setJson(newJson : EtiquetteJSON){
        this.json = newJson;
    }

    setJsonBox(jsonBox : number[] ){
        this.json.box = jsonBox;
    }

    setJsonText(jsonText : string ){
        this.json.text = jsonText;
    }

    setJsonClass(jsonClass : string ){
        this.json.class = jsonClass;
    }
//#endregion

//#region 
// FONCTIONS

    modifierRectVersJSON(ratio : number) {
        let x : number = this.rect.left as number / ratio;
        let y : number = this.rect.top as number / ratio;
        let sizeX : number = (this.rect.width as number * (this.rect.scaleX as number)) / ratio;
        let sizeY : number = (this.rect.height as number * (this.rect.scaleX as number)) / ratio;

        this.setJsonBox([x, y , sizeX, sizeY]);
    }
//#endregion

}