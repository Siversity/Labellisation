import { fabric } from 'fabric';
import { EtiquetteJSON } from "./Etiquette";
import { v4 as uuidv4 } from 'uuid';
import { delay } from 'rxjs';

export class Association {

    // Attributs
    rect: fabric.Rect;
    json: EtiquetteJSON;
    id: string;


    // Constructeur
    constructor(canvas: fabric.Canvas, texte: string, classe: string, origX: number, origY: number, tailleX: number, tailleY: number) {

        ////////
        // ID //
        ////////
        this.id = uuidv4()


        /////////////////////////////
        // Création du fabric.Rect //
        /////////////////////////////
        let rect: fabric.Rect = new fabric.Rect({
            left: origX,
            top: origY,
            originX: 'left',
            originY: 'top',
            width: tailleX,
            height: tailleY,
            angle: 0,
            fill: 'rgba(0,0,0,0)',
            backgroundColor: 'rgba(255,0,0,0.5)',
            borderColor: 'rgba(0, 0, 0, 1)',
            hasBorders: true,
            opacity: 0.7,
            transparentCorners: false,
            //@ts-ignore
            id: this.id,
        });

        // Désactivation de la possibilité de rotation de l'étiquette
        rect.setControlsVisibility({ mtr: false });
            
            rect.on("mousedown", (o) => {
                console.log("MouseDown")
                rect.set({
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                })
                canvas.renderAll()
            })
            
            rect.on("mouseup", (o) => {
                console.log("MouseUp")
                rect.set({
                    backgroundColor: 'rgba(255,0,0,0.5)',
                })
                canvas.renderAll()
            })



        // Ajout de l'étiquette au canvas
        canvas.add(rect);

        // Définition de l'attribut
        this.rect = rect;


        //////////////////////
        // Création du JSON //
        //////////////////////
        let ratio: number = canvas.getObjects()[0].scaleX as number;
        let json: EtiquetteJSON = {
            text: texte,
            class: classe,
            box: [origX / ratio, origY / ratio, tailleX / ratio, tailleY / ratio]
        }

        // Définition de l'attribut
        this.json = json;
    }


    //#region 
    // Getters
    getId() {
        return this.id;
    }

    getRect() {
        return this.rect;
    }

    getJson() {
        return this.json;
    }
    //#endregion


    //#region 
    // Setters
    setRect(rectangle: fabric.Rect) {
        this.rect = rectangle;
    }

    setRectTop(top: number) {
        this.rect.top = top;
    }

    setRectLeft(left: number) {
        this.rect.left = left;
    }

    setRectCoordAndSize(x: number, y: number, sizeX: number, sizeY: number) {
        this.rect.left = x;
        this.rect.top = y;
        this.rect.width = sizeX;
        this.rect.height = sizeY;
    }

    setRectWidth(width: number) {
        this.rect.width = width;
    }

    setRectHeight(height: number) {
        this.rect.height = height;
    }


    setJson(newJson: EtiquetteJSON) {
        this.json = newJson;
    }

    setJsonBox(jsonBox: number[]) {
        this.json.box = jsonBox;
    }

    setJsonText(jsonText: string) {
        this.json.text = jsonText;
    }

    setJsonClass(jsonClass: string) {
        this.json.class = jsonClass;
    }
    //#endregion

    //#region 
    // FONCTIONS

    modifierJSONFromRect(ratio: number) {
        let x: number = this.rect.left as number / ratio;
        let y: number = this.rect.top as number / ratio;
        let sizeX: number = (this.rect.width as number * (this.rect.scaleX as number)) / ratio;
        let sizeY: number = (this.rect.height as number * (this.rect.scaleY as number)) / ratio;

        this.setJsonBox([x, y, sizeX, sizeY]);
    }
    //#endregion

    modifierRectFromJSON(ratio: number) {
        console.log("test", ratio)
        console.log(this.json.box)
        let left: number = this.json.box[0] as number * ratio;
        let top: number = this.json.box[1] as number * ratio;
        let width: number = (this.json.box[2] as number * ratio) / (this.rect.scaleX as number);
        let height: number = (this.json.box[3] as number * ratio) / (this.rect.scaleY as number);

        this.setRectCoordAndSize(left, top, width, height);
    }

    //#endregion

}