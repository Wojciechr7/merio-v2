
export default class Canvas {

    private _canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;


    constructor(doc: HTMLDocument) {
        this._canvas = doc.createElement("canvas");
        this._canvas.setAttribute("id", "canvas");
        this._canvas.width = 500;
        this._canvas.height = 300;
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