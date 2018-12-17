import {Injectable} from '../../../injector';
import GameService from "../../game-service";

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

@Injectable()
export default class BoardModel implements EventProcessor {

    private controller!: BoardController;
    private view!: BoardView;
    readonly released: IReleasedKeys;
    private merio: Merio;
    private intervals: Iinterval;


    constructor(private gs?: GameService) {

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

    public processKeyUpEvent(listener: KeyboardListener) {
        this.controller.stopKeypress(listener);
    }

    public stopMerio(listener: KeyboardListener) {
        switch (listener.keyName) {
            case 'ArrowLeft':
                clearTimeout(this.intervals.moveLeftAnimation);
                clearTimeout(this.intervals.moveLeft);
                this.released.left = true;
                break;
            case 'ArrowRight':
                clearTimeout(this.intervals.moveRightAnimation);
                clearTimeout(this.intervals.moveRight);
                this.released.right = true;
                break;
            case 'ArrowUp':
                clearTimeout(this.intervals.jump);
                this.fall();
                break;
        }
        if (listener.keyName !== 'ArrowUp') {
            this.merio.resetSprite();
        }
    }

    private fall() {
        this.view.clearMerio(this.merio.Walk, this.merio.Pos);
        if (this.merio.fall()) {

            this.intervals.fall = setTimeout(this.fall.bind(this), FPS.JUMP / 2);
        }

    }


    public walkLeftSwitchSprite() {
            //console.log('walk left anim');
            this.merio.walkLeftSwitchSprite();
            this.intervals.moveLeftAnimation = setTimeout(this.walkLeftSwitchSprite.bind(this), FPS.WALK);
    }

    public walkRightSwitchSprite() {
            //console.log('walk right anim');
            this.merio.walkRightSwitchSprite();
            this.intervals.moveRightAnimation = setTimeout(this.walkRightSwitchSprite.bind(this), FPS.WALK);

    }
    public walkLeft() {
            //console.log('walk left');
            this.view.clearMerio(this.merio.Walk, this.merio.Pos);
            this.released.left = false;
            this.merio.walkLeft();

            this.intervals.moveLeft = setTimeout(this.walkLeft.bind(this), FPS.MOVE);

    }

    public walkRight() {
            //console.log('walk right');
            this.view.clearMerio(this.merio.Walk, this.merio.Pos);
            this.released.right = false;

            this.merio.walkRight();
            this.intervals.moveRight = setTimeout(this.walkRight.bind(this), FPS.MOVE);

    }

    public jump(): void {
        this.view.clearMerio(this.merio.Walk, this.merio.Pos);
        if (this.merio.jump()) {
            this.intervals.jump = setTimeout(this.jump.bind(this), FPS.JUMP);
        } else {
            clearTimeout(this.intervals.jump);
            this.fall();
        }
    }

    public isJumping(): boolean {
        return this.merio.isJumping();
    }

    public jumpAnimation() {

        this.merio.jumpSwitchSprite();
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

    get ActualSprite() {
        return this.merio.ActualSprite;
    }


}