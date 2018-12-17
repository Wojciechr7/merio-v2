import {Iposition} from "../../common/interfaces/position.interface";
import {POSITION, SPRITE_SIZE, SPRITES} from "../../common/const";
import {IReleasedKeys} from "../../common/interfaces/released.interface";
import {WalkSide} from "../../common/interfaces/walk.interface";


export default class Merio {


    private actualSprite: Iposition;
    // walkside 1 - right, -1 - left
    readonly walk: WalkSide;
    private onAir: boolean;
    readonly pos: Iposition;
    private released: IReleasedKeys;
    private jumpHeight: number;
    private walkAnimationIndex: number;


    constructor(released: IReleasedKeys) {
        this.released = released;
        this.jumpHeight = 0;
        this.walkAnimationIndex = 0;

        this.pos = Object.assign({}, POSITION.START);
        this.walk = {
            side: 1
        };

        this.actualSprite = Object.assign({}, SPRITES.STAND);

        this.onAir = false;


    }

    get ActualSprite(): Iposition {
        return this.actualSprite;
    }

    get Walk(): WalkSide {
        return this.walk;
    }

    get Pos(): Iposition {
        return this.pos;
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
            this.actualSprite = Object.assign({}, SPRITES.STAND);
        }
    }

    public walkRight(): void {
        if (this.released.left) {
            this.walk.side = 1;
            this.pos.x = Math.abs(this.pos.x);
            if (this.pos.x < 500 - SPRITE_SIZE.MERIO) {
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
        this.jumpHeight = this.jumpHeight === 100 ? this.jumpHeight : this.jumpHeight + 10;
        this.pos.y -= 10;
        return this.jumpHeight !== 100;
    }

    public fall(): boolean {
        if (this.onAir) {
            this.pos.y++;
            this.jumpHeight--;
        }

        if (this.pos.y === 263) {
            if (this.released.right && !this.released.left) {
                this.onAir = false;
            } else if (!this.released.right && this.released.left) {
                this.onAir = false;
            }

            this.onAir = false;
            this.actualSprite = Object.assign({}, SPRITES.STAND);
            return false;

        }
        return true;
    }

    public jumpSwitchSprite(): void {
        this.actualSprite.x = 124;
        this.actualSprite.y = 215;
    }

    public walkLeftSwitchSprite(): void {
        const moves = [SPRITES.WALK_1, SPRITES.WALK_2, SPRITES.WALK_3];

        if (!this.onAir && this.released.right) {
            this.actualSprite = Object.assign({}, moves[this.walkAnimationIndex]);

            this.walkAnimationIndex = this.walkAnimationIndex === 2 ? 0 : this.walkAnimationIndex + 1;
        } else if (!this.onAir && !this.released.right){
            this.actualSprite = Object.assign({}, SPRITES.STAND);
        }

    }

    public walkRightSwitchSprite(): void {
        const moves = [SPRITES.WALK_1, SPRITES.WALK_2, SPRITES.WALK_3];

        if (!this.onAir && this.released.left) {
            this.actualSprite = Object.assign({}, moves[this.walkAnimationIndex]);

            this.walkAnimationIndex = this.walkAnimationIndex === 2 ? 0 : this.walkAnimationIndex + 1;
        } else if (!this.onAir && !this.released.left) {
            this.actualSprite = Object.assign({}, SPRITES.STAND);
        }
    }


}