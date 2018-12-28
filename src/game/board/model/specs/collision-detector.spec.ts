import "jasmine";
import {CollisionDetector} from "../collision-detector";
import {POSITION, SPRITE_SIZE} from "../../../common/const";




describe("Detect method", () => {
    it("should return false on starting position", () => {
        const collisionDetector = new CollisionDetector(POSITION.START);
        expect(!!collisionDetector.detect()).toBe(false);
    });

    it("should return true on tube position", () => {
        const collisionDetector = new CollisionDetector({x: POSITION.TUBE.x - SPRITE_SIZE.MERIO, y: POSITION.START.y});
        expect(!!collisionDetector.detect()).toBe(true);
    });

});

describe("Init method", () => {
    it("should mark three-side collisions as false", () => {
        const collisionDetector = new CollisionDetector(POSITION.START);
        const collisions = collisionDetector.init();
        expect(collisions.bottom).toBe(false);
        expect(collisions.left).toBe(false);
        expect(collisions.right).toBe(false);
    });

});