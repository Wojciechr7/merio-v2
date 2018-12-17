import "jasmine";
import {JSDOM} from "jsdom";

const dom = new JSDOM(`<div id="App"></div>`);


import {KeyboardUp, KeyboardDown, KeyboardLeft, KeyboardRight, KeyboardListener} from "../keyboard-listener";


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



describe("Keyboard-ArrowUp press listener", () => {
    const subscribent = keyListeners[0].keyPress().subscribe((key: boolean) => {
        it("should return true", () => {
            expect(key).toBe(true);
        });
        subscribent.unsubscribe();
    });
});
dom.window.document.dispatchEvent(new dom.window.KeyboardEvent('keydown', {key: 'ArrowUp'}));


describe("Keyboard-ArrowDown press listener", () => {
    const subscribent = keyListeners[1].keyPress().subscribe((key: boolean) => {
        it("should return true", () => {
            expect(key).toBe(true);
        });
        subscribent.unsubscribe();
    });
});
dom.window.document.dispatchEvent(new dom.window.KeyboardEvent('keydown', {key: 'ArrowDown'}));

describe("Keyboard-ArrowLeft press listener", () => {
    const subscribent = keyListeners[2].keyPress().subscribe((key: boolean) => {
        it("should return true", () => {
            expect(key).toBe(true);
        });
        subscribent.unsubscribe();
    });
});
dom.window.document.dispatchEvent(new dom.window.KeyboardEvent('keydown', {key: 'ArrowLeft'}));



describe("Keyboard-ArrowRight press listener", () => {
    const subscribent = keyListeners[3].keyPress().subscribe((key: boolean) => {
        it("should return true", () => {
            expect(key).toBe(true);
        });
        subscribent.unsubscribe();
    });
});
dom.window.document.dispatchEvent(new dom.window.KeyboardEvent('keydown', {key: 'ArrowRight'}));





describe("Keyboard-ArrowUp release listener", () => {
    const subscribent = keyListeners[0].keyUp().subscribe((key: boolean) => {
        it("should return true", () => {
            expect(key).toBe(true);
        });
        subscribent.unsubscribe();
    });
});
dom.window.document.dispatchEvent(new dom.window.KeyboardEvent('keyup', {key: 'ArrowUp'}));



describe("Keyboard-ArrowDown release listener", () => {
    const subscribent = keyListeners[1].keyUp().subscribe((key: boolean) => {
        it("should return true", () => {
            expect(key).toBe(true);
        });
        subscribent.unsubscribe();
    });
});
dom.window.document.dispatchEvent(new dom.window.KeyboardEvent('keyup', {key: 'ArrowDown'}));

describe("Keyboard-ArrowLeft release listener", () => {
    const subscribent = keyListeners[2].keyUp().subscribe((key: boolean) => {
        it("should return true", () => {
            expect(key).toBe(true);
        });
        subscribent.unsubscribe();
    });
});
dom.window.document.dispatchEvent(new dom.window.KeyboardEvent('keyup', {key: 'ArrowLeft'}));



describe("Keyboard-ArrowRight release listener", () => {
    const subscribent = keyListeners[3].keyUp().subscribe((key: boolean) => {
        it("should return true", () => {
            expect(key).toBe(true);
        });
        subscribent.unsubscribe();
    });
});
dom.window.document.dispatchEvent(new dom.window.KeyboardEvent('keyup', {key: 'ArrowRight'}));
