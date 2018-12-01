

export default class Canvas {

    readonly _canvas: HTMLElement;

    constructor(doc: HTMLDocument) {
        this._canvas = doc.createElement("canvas");
        this.insertToDocument(doc);
    }

    get Cvs(): HTMLElement {
        return this._canvas;
    }

    private insertToDocument(doc: HTMLDocument): void {
        const app = doc.getElementById('App');
        app!.appendChild(this._canvas);
    }




}