import {Injectable} from '../../../injector';
import BoardController from "../controller/board-controler";
import {Key} from "../../common/key";
import {GameEventType, MoveDownEvent, MoveLeftEvent, MoveRightEvent, MoveUpEvent} from "../../common/game-event";
import EventProcessor from "../../common/interfaces/event-processor.interface";
import {Iposition} from "../../common/interfaces/position.interface";
import {Iinterval} from "../../common/interfaces/interval.interface";
import {FPS} from "../../common/const";
import {IReleasedKeys} from "../../common/interfaces/released.interface";
import Merio from "./merio";
import {KeyboardListener} from "../view/keyboard-listener";
import BoardView from "../view/board-view";
import {WalkSide} from "../../common/interfaces/walk.interface";
import {CollisionDetector} from "./collisions/collision-detector";
import {ICollision} from "../../common/interfaces/collision.interface";
import CornerDetector from "./collisions/corner-detector";
import InteriorDetector from "./collisions/interior-detector";

@Injectable()
export default class BoardModel implements EventProcessor {

    private controller!: BoardController;
    private view!: BoardView;
    readonly released: IReleasedKeys;
    private merio: Merio;
    readonly intervals: Iinterval;
    private collisionDetectors: Array<CollisionDetector>;
    private collisions: ICollision;


    constructor() {

        this.intervals = {
            moveLeftAnimation: undefined,
            moveRightAnimation: undefined,
            moveRight: undefined,
            moveLeft: undefined,
            jump: undefined,
            fall: undefined,
        };

        this.released = {
            left: true,
            right: true
        };

        this.merio = new Merio(this.released);
        this.collisionDetectors = [new CornerDetector(this.merio.Pos), new InteriorDetector(this.merio.Pos)];
        this.collisions = this.collisionDetectors[0].init();

    }

    public processEvent(type: Key): void {
        switch (parseInt(type.toString())) {
            case GameEventType.MOVE_UP:
                this.controller.processMoveUp(new MoveUpEvent(type));
                break;
            case GameEventType.MOVE_DOWN:
                this.controller.processMoveDown(new MoveDownEvent(type));
                break;
            case GameEventType.MOVE_LEFT:
                this.controller.processMoveLeft(new MoveLeftEvent(type));
                break;
            case GameEventType.MOVE_RIGHT:
                this.controller.processMoveRight(new MoveRightEvent(type));
                break;
        }
    }

    public processKeyUpEvent(listener: KeyboardListener): void {
        this.controller.stopKeypress(listener);
    }

    public stopMerio({keyName}: KeyboardListener): void {
        switch (keyName) {
            case 'ArrowLeft':
                clearTimeout(this.intervals.moveLeftAnimation);
                this.intervals.moveLeftAnimation = undefined;
                clearTimeout(this.intervals.moveLeft);
                this.intervals.moveLeft = undefined;
                this.released.left = true;
                this.collisions.right = false;
                this.view.clearMerio(this.merio.Walk, this.merio.Pos);
                break;
            case 'ArrowRight':
                clearTimeout(this.intervals.moveRightAnimation);
                this.intervals.moveRightAnimation = undefined;
                clearTimeout(this.intervals.moveRight);
                this.intervals.moveRight = undefined;
                this.released.right = true;
                this.collisions.left = false;
                this.view.clearMerio(this.merio.Walk, this.merio.Pos);
                break;
            case 'ArrowUp':
                clearTimeout(this.intervals.jump);
                this.intervals.jump = undefined;
                this.fall();
                break;
            case 'ArrowDown':
                console.log(this.intervals);
                break;
        }
        if (keyName !== 'ArrowUp') {
            this.merio.resetSprite();
        }
    }

    private fall(): void {
        this.view.clearMerio(this.merio.Walk, this.merio.Pos);
        this.collisions.bottom = this.collisionDetectors[0].detect();
        if (this.merio.fall()) {
            this.intervals.fall = setTimeout(this.fall.bind(this), FPS.JUMP / 2);
        } else {
            clearTimeout(this.intervals.fall);
            this.intervals.fall = undefined;
        }

    }

    public walkLeftSwitchSprite(): void {
        //console.log('walk left anim');
        this.merio.walkLeftSwitchSprite();
        this.intervals.moveLeftAnimation = setTimeout(this.walkLeftSwitchSprite.bind(this), FPS.WALK);

    }

    public walkRightSwitchSprite(): void {
        //console.log('walk right anim');
        this.merio.walkRightSwitchSprite();
        this.intervals.moveRightAnimation = setTimeout(this.walkRightSwitchSprite.bind(this), FPS.WALK);

    }

    public walkLeft(): void {

        this.view.clearMerio(this.merio.Walk, this.merio.Pos);

        if (!this.collisions.left && !this.collisionDetectors[1].detect()) {
            this.released.left = false;
            this.merio.walkLeft();
        }
        this.collisions.left = this.collisionDetectors[0].detect();
        this.fallFromObject('left');


        this.intervals.moveLeft = setTimeout(this.walkLeft.bind(this), FPS.MOVE);
    }

    public walkRight(): void {

        this.view.clearMerio(this.merio.Walk, this.merio.Pos);

        if (!this.collisions.right && !this.collisionDetectors[1].detect()) {
            this.released.right = false;
            this.merio.walkRight();
        }

        this.collisions.right = this.collisionDetectors[0].detect();
        this.fallFromObject('right');


        this.intervals.moveRight = setTimeout(this.walkRight.bind(this), FPS.MOVE);
    }

    private fallFromObject(side: string): void {
        if (side === 'right') {
            if (this.collisions.right && this.merio.jumpedOnTube) {
                if (this.merio.isJumping()) {
                    this.collisions.right = false;
                    this.fall();
                    this.merio.jumpSwitchSprite();
                    this.merio.jumpedOnTube = false;
                }
            }
        } else if (side === 'left') {
            if (this.collisions.left && this.merio.jumpedOnTube) {
                if (this.merio.isJumping()) {
                    this.collisions.left = false;
                    this.fall();
                    this.merio.jumpSwitchSprite();
                    this.merio.jumpedOnTube = false;
                }
            }
        }
    }

    public jump(): void {
        this.view.clearMerio(this.merio.Walk, this.merio.Pos);
        if (this.merio.jump()) {
            this.intervals.jump = setTimeout(this.jump.bind(this), FPS.JUMP);
        } else {
            clearTimeout(this.intervals.jump);
            this.intervals.jump = undefined;
            this.fall();
        }
    }

    public jumpAnimation(): void {
        this.merio.jumpSwitchSprite();
    }

    public isJumping(): boolean {
        return this.merio.isJumping();
    }

    set Controller(c: BoardController) {
        this.controller = c;
    }

    set View(v: BoardView) {
        this.view = v;
    }


    get Walk(): WalkSide {
        return this.merio.Walk;
    }

    get MerioPos(): Iposition {
        return this.merio.Pos;
    }

    get ActualSprite(): Iposition {
        return this.merio.ActualSprite;
    }


}