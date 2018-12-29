import "jasmine";
import {POSITION, SPRITE_SIZE} from "../../../common/const";
import InteriorDetector from "../collisions/interior-detector";
import CornerDetector from "../collisions/corner-detector";




describe("Detect method as CornerDetector class", () => {
    it("should return false on starting position", () => {
        const collisionDetector = new CornerDetector(POSITION.START);
        expect(!!collisionDetector.detect()).toBe(false);
    });

    it("should return true on tube position", () => {
        const collisionDetector = new CornerDetector({x: POSITION.TUBE.x - SPRITE_SIZE.MERIO, y: POSITION.START.y});
        expect(!!collisionDetector.detect()).toBe(true);
    });

});

describe("Detect method as InteriorDetector class", () => {
    it("should return false on starting position", () => {
        const collisionDetector = new InteriorDetector(POSITION.START);
        expect(!!collisionDetector.detect()).toBe(false);
    });

    it("should return true on tube position", () => {
        const collisionDetector = new InteriorDetector({x: POSITION.TUBE.x - SPRITE_SIZE.MERIO + 2, y: POSITION.START.y});
        expect(!!collisionDetector.detect()).toBe(true);
    });

});

describe("Init method", () => {
    it("should mark three-side collisions as false", () => {
        const collisionDetector = new InteriorDetector(POSITION.START);
        const collisions = collisionDetector.init();
        expect(collisions.bottom).toBe(false);
        expect(collisions.left).toBe(false);
        expect(collisions.right).toBe(false);
    });

});