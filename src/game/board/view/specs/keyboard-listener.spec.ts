import "jasmine";
import {JSDOM} from "jsdom";
import {KeyboardUp, KeyboardDown, KeyboardLeft, KeyboardRight, KeyboardListener} from "../keyboard-listener";

const dom = new JSDOM(`<div id="App"></div>`);


const keyListeners: Array<KeyboardListener> = [
    new KeyboardUp(dom.window.document),
    new KeyboardDown(dom.window.document),
    new KeyboardLeft(dom.window.document),
    new KeyboardRight(dom.window.document)];


describe("Keyboard Listener name", () => {
    it("should be ArrowUp", () => {
        expect(keyListeners[0].keyName).toBe('ArrowUp');
    });
    it("should be ArrowDown", () => {
        expect(keyListeners[1].keyName).toBe('ArrowDown');
    });
    it("should be ArrowLeft", () => {
        expect(keyListeners[2].keyName).toBe('ArrowLeft');
    });
    it("should be ArrowRight", () => {
        expect(keyListeners[3].keyName).toBe('ArrowRight');
    });
});


describe("Keyboard press listener", () => {
    it("ArrowUp should return true", (done: DoneFn) => {
        const subscriber = keyListeners[0].keyPress().subscribe((key: boolean) => {
            expect(key).toBe(true);
            done();
        });
        dom.window.document.dispatchEvent(new dom.window.KeyboardEvent('keydown', {key: 'ArrowUp'}));
        subscriber.unsubscribe();
    });

    it("ArrowDown should return true", (done: DoneFn) => {
        const subscriber = keyListeners[1].keyPress().subscribe((key: boolean) => {
            expect(key).toBe(true);
            done();
        });
        dom.window.document.dispatchEvent(new dom.window.KeyboardEvent('keydown', {key: 'ArrowDown'}));
        subscriber.unsubscribe();
    });

    it("ArrowLeft should return true", (done: DoneFn) => {
        const subscriber = keyListeners[2].keyPress().subscribe((key: boolean) => {
            expect(key).toBe(true);
            done();
        });
        dom.window.document.dispatchEvent(new dom.window.KeyboardEvent('keydown', {key: 'ArrowLeft'}));
        subscriber.unsubscribe();
    });

    it("ArrowRight should return true", (done: DoneFn) => {
        const subscriber = keyListeners[3].keyPress().subscribe((key: boolean) => {
            expect(key).toBe(true);
            done();
        });
        dom.window.document.dispatchEvent(new dom.window.KeyboardEvent('keydown', {key: 'ArrowRight'}));
        subscriber.unsubscribe();
    });

});


describe("Keyboard release listener", () => {
    it("ArrowUp should return true", (done: DoneFn) => {
        const subscriber = keyListeners[0].keyUp().subscribe((key: boolean) => {
            expect(key).toBe(true);
            done();
        });
        dom.window.document.dispatchEvent(new dom.window.KeyboardEvent('keyup', {key: 'ArrowUp'}));
        subscriber.unsubscribe();
    });

    it("ArrowDown should return true", (done: DoneFn) => {
        const subscriber = keyListeners[1].keyUp().subscribe((key: boolean) => {
            expect(key).toBe(true);
            done();
        });
        dom.window.document.dispatchEvent(new dom.window.KeyboardEvent('keyup', {key: 'ArrowDown'}));
        subscriber.unsubscribe();
    });

    it("ArrowLeft should return true", (done: DoneFn) => {
        const subscriber = keyListeners[2].keyUp().subscribe((key: boolean) => {
            expect(key).toBe(true);
            done();
        });
        dom.window.document.dispatchEvent(new dom.window.KeyboardEvent('keyup', {key: 'ArrowLeft'}));
        subscriber.unsubscribe();
    });

    it("ArrowRight should return true", (done: DoneFn) => {
        const subscriber = keyListeners[3].keyUp().subscribe((key: boolean) => {
            expect(key).toBe(true);
            done();
        });
        dom.window.document.dispatchEvent(new dom.window.KeyboardEvent('keyup', {key: 'ArrowRight'}));
        subscriber.unsubscribe();
    });

});

