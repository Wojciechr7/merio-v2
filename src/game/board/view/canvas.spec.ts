import "jasmine";
import Canvas from "./canvas";
import {JSDOM} from "jsdom";



const dom = new JSDOM(`<div id="App"></div>`);

const canvas = new Canvas(dom.window.document);


describe("Canvas", () => {
    it("should create canvas", () => {
        expect(dom.window.document.querySelectorAll('canvas').length).toEqual(1);
    });
});