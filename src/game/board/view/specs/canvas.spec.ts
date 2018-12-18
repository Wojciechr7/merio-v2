import "jasmine";
import Canvas from "../canvas";
import {JSDOM} from "jsdom";



const dom = new JSDOM(`<div id="App"></div>`);


describe("Canvas", () => {
    const canvas = new Canvas(dom.window.document);
    it("should create canvas", () => {
        expect(dom.window.document.querySelectorAll('canvas').length).toEqual(1);
    });
});