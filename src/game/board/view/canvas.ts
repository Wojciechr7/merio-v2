

export class Canvas {

    private _canvas: HTMLElement;

    constructor() {
        this._canvas = document.createElement("canvas");
        this.insertToDocument();
    }

    get Cvs(): HTMLElement {
        return this._canvas;
    }

    private insertToDocument(): void {
        const app = document.getElementById('App');
        app!.appendChild(this._canvas);
    }




}