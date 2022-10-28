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

    setRectCoordAndSize(x : number, y : number, sizeX : number, sizeY : number) {
        this.rect.left = x;
        this.rect.top = y;
        this.rect.width = sizeX;
        this.rect.height = sizeY;
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

    modifierJSONFromRect(ratio : number) {
        let x : number = this.rect.left as number / ratio;
        let y : number = this.rect.top as number / ratio;
        let sizeX : number = (this.rect.width as number * (this.rect.scaleX as number)) / ratio;
        let sizeY : number = (this.rect.height as number * (this.rect.scaleX as number)) / ratio;

        this.setJsonBox([x, y , sizeX, sizeY]);
    }

    modifierRectFromJSON(ratio : number) {
        let left : number = this.json.box[0] as number * ratio;
        let top : number = this.json.box[1] as number * ratio;
        let width : number = (this.json.box[2] as number * ratio) / (this.rect.scaleX as number);
        let height : number = (this.json.box[3] as number * ratio) / (this.rect.scaleY as number);

        this.setRectCoordAndSize(left, top, width, height);
    }

//#endregion

}