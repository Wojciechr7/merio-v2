import {CANVAS} from "../../common/const";

export default class Canvas {

    readonly _canvas: HTMLCanvasElement;
    readonly ctx: CanvasRenderingContext2D;


    constructor(doc: HTMLDocument) {
        this._canvas = doc.createElement("canvas");
        this._canvas.setAttribute("id", "canvas");
        this._canvas.width = CANVAS.WIDTH;
        this._canvas.height = CANVAS.HEIGHT;
        this.insertToDocument(doc);
        this.ctx = this._canvas.getContext("2d") as CanvasRenderingContext2D;

    }

    get Ctx(): CanvasRenderingContext2D {
        return this.ctx;
    }

    private insertToDocument(doc: HTMLDocument): void {
        const app = doc.getElementById('App');
        app!.appendChild(this._canvas);
    }


}