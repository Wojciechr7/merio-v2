import {Iposition} from "../../common/interfaces/position.interface";
import {CANVAS, POSITION, SPRITE_SIZE, SPRITES} from "../../common/const";
import {IReleasedKeys} from "../../common/interfaces/released.interface";
import {WalkSide} from "../../common/interfaces/walk.interface";
import "babel-polyfill";


export default class Merio {

    private actualSprite: Iposition;
    // walkside 1 - right, -1 - left
    readonly walk: WalkSide;
    private onAir: boolean;
    readonly pos: Iposition;
    private released: IReleasedKeys;
    private jumpHeight: number;
    public jumpedOnTube: boolean;
    private lastFloor: string;
    private stepGenerator: IterableIterator<number>;


    constructor(released: IReleasedKeys) {
        this.released = released;
        this.jumpHeight = 0;
        this.jumpedOnTube = false;
        this.lastFloor = 'from ground';
        this.pos = {...POSITION.START};
        this.walk = {
            side: 1
        };
        this.actualSprite = {...SPRITES.STAND};
        this.onAir = false;

        this.stepGenerator = this.generator();

    }

    private* generator(): IterableIterator<number> {
        let index = 0;

        while(true)
            yield index = index === 2 ? 0 : index + 1;
    }

    public isJumping(): boolean {
        if (this.onAir) {
            return true;
        } else {
            this.onAir = true;
            return false;
        }
    }

    public resetSprite(): void {
        if (!this.onAir) {
            this.actualSprite = {...SPRITES.STAND};
        }
    }

    public walkRight(): void {
        if (this.released.left) {
            this.walk.side = 1;
            this.pos.x = Math.abs(this.pos.x);
            if (this.pos.x < CANVAS.WIDTH - SPRITE_SIZE.MERIO) {
                this.pos.x++;
            }
            this.pos.x *= this.walk.side;
        }
    }

    public walkLeft(): void {
        if (this.released.right) {
            this.walk.side = -1;
            this.pos.x = Math.abs(this.pos.x);
            if (this.pos.x > 0) {
                this.pos.x--;
            }
            this.pos.x *= this.walk.side;
        }
    }

    public jump(): boolean {
        this.jumpedOnTube = false;
        if (this.lastFloor === 'from ground') {
            return this.determineJumpHeight(100);
        } else {
            return this.determineJumpHeight(100 + SPRITE_SIZE.TUBE);
        }
    }

    private determineJumpHeight(val: number): boolean {
        this.jumpHeight = this.jumpHeight === val ? this.jumpHeight : this.jumpHeight + 10;
        this.pos.y -= 10;
        return this.jumpHeight !== val;
    }

    public fall(): boolean {
        if ((this.pos.y === POSITION.TUBE.y - SPRITE_SIZE.MERIO + 1) && Math.abs(this.pos.x) > POSITION.TUBE.x - SPRITE_SIZE.MERIO && Math.abs(this.pos.x) < POSITION.TUBE.x + SPRITE_SIZE.TUBE) {
            this.jumpedOnTube = true;
            return this.fellOnFloor('from tube');
        }

        if (this.pos.y === POSITION.START.y) {
            return this.fellOnFloor('from ground');
        }
        this.pos.y++;
        this.jumpHeight--;
        return true;
    }

    private fellOnFloor(last: string): boolean {
        if (this.released.right && !this.released.left) {
            this.onAir = false;
        } else if (!this.released.right && this.released.left) {
            this.onAir = false;
        }
        this.onAir = false;
        this.actualSprite = {...SPRITES.STAND};
        this.lastFloor = last;
        return false;
    }

    public jumpSwitchSprite(): void {
        this.actualSprite = {...SPRITES.JUMP};
    }

    public walkLeftSwitchSprite(): void {
        const moves = [SPRITES.WALK_1, SPRITES.WALK_2, SPRITES.WALK_3];

        if (!this.onAir && this.released.right) {
            this.actualSprite = {...moves[this.stepGenerator.next().value]};

        } else if (!this.onAir && !this.released.right){
            this.actualSprite = {...SPRITES.STAND};
        }
    }

    public walkRightSwitchSprite(): void {
        const moves = [SPRITES.WALK_1, SPRITES.WALK_2, SPRITES.WALK_3];

        if (!this.onAir && this.released.left) {
            this.actualSprite = {...moves[this.stepGenerator.next().value]};

        } else if (!this.onAir && !this.released.left) {
            this.actualSprite = {...SPRITES.STAND};
        }
    }

    get ActualSprite(): Iposition {
        return this.actualSprite;
    }

    get Walk(): WalkSide {
        return this.walk;
    }
    get OnAir(): boolean {
        return this.onAir;
    }

    get Pos(): Iposition {
        return this.pos;
    }


}