import "jasmine";
import Merio from "../merio";
import {POSITION, SPRITES} from "../../../common/const";

const releasedMock = {
    left: true,
    right: true
};

describe("isJumping method", () => {
    const merio = new Merio({...releasedMock});

    let isJumping: boolean;
    beforeEach(() => {
        isJumping = merio.isJumping();
    });

    it("should return false", () => {
        expect(isJumping).toBe(false);
    });
    it("should return true", () => {
        expect(isJumping).toBe(true);
    });
});



describe("Reset sprite method", () => {
    const merio = new Merio({...releasedMock});
    beforeEach(() => merio.resetSprite());
    it("should reset sprite to stand sprite x value", () => {
        expect(merio.ActualSprite.x).toBe(SPRITES.STAND.x);
    });
    it("should reset sprite to stand sprite y value", () => {
        expect(merio.ActualSprite.y).toBe(SPRITES.STAND.y);
    });
});

describe("Walk right method", () => {
    const merio = new Merio({...releasedMock});
    beforeEach(() => merio.walkRight());

    it("should increment position x by 1", () => {
        expect(merio.Pos.x).toEqual(merio.walk.side * (POSITION.START.x + 1));
    });
});

describe("Walk left method", () => {
    const merio = new Merio({...releasedMock});
    beforeEach(() => merio.walkLeft());
    it("should decrement position x by 1", () => {
        expect(merio.Pos.x).toEqual(merio.walk.side * POSITION.START.x);
    });
});


describe("Jump method", () => {
    const merio = new Merio({...releasedMock});
    it("should return true", () => {
        expect(merio.jump()).toBe(true);
    });
    it("should increment position y by 10", () => {
        expect(merio.Pos.y).toEqual(POSITION.START.y - 10);
    });
});

describe("Fall method", () => {
    const merio = new Merio({...releasedMock});
    const positionBefore = merio.Pos.y;
    it("should return false", () => {
        expect(merio.fall()).toBe(false);
    });

    it("should not change position y", () => {
        expect(merio.Pos.y).toEqual(positionBefore);
    });
});

describe("JumpSwitchSprite method", () => {
    const merio = new Merio({...releasedMock});
    beforeEach(() => merio.jumpSwitchSprite());
    it("should set actualSprite x to constant jump sprite x", () => {
        expect(merio.ActualSprite.x).toEqual(SPRITES.JUMP.x);
    });

    it("should set actualSprite y to constant jump sprite y", () => {
        expect(merio.ActualSprite.y).toEqual(SPRITES.JUMP.y);
    });
});

describe("walkLeftSwitchSprite method", () => {
    const merio = new Merio({...releasedMock});
    beforeEach(() => merio.walkLeftSwitchSprite());

    it("should set actualSprite coordinates to WALK_1 constant", () => {
        expect(merio.ActualSprite.x).toEqual(SPRITES.WALK_1.x);
        expect(merio.ActualSprite.y).toEqual(SPRITES.WALK_1.y);
    });
});

describe("walkRightSwitchSprite method", () => {
    const merio = new Merio({...releasedMock});
    beforeEach(() => merio.walkRightSwitchSprite());

    it("should set actualSprite coordinates to WALK_1 constant", () => {
        expect(merio.ActualSprite.x).toEqual(SPRITES.WALK_1.x);
        expect(merio.ActualSprite.y).toEqual(SPRITES.WALK_1.y);
    });
});