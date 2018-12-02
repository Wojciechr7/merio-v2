import { Injectable } from '../../../injector';
import GameService from "../../game-service";

import BoardController from "../controller/board-controler";
import {Key} from "../../common/key";
import {GameEventType, MoveDownEvent, MoveLeftEvent, MoveRightEvent, MoveUpEvent} from "../../common/game-event";
import EventProcessor from "../../common/event-processor.interface";

@Injectable()
export default class BoardModel implements EventProcessor {

    private controller!: BoardController;

    constructor(private gs?: GameService) {

    }

    public doSomething() {
        console.log('something');
    }

    public processEvent(type: Key): void {
        switch (parseInt(type.toString())) {
            case GameEventType.MOVE_UP: this.controller.processMoveUp(new MoveUpEvent(type));
                break;
            case GameEventType.MOVE_DOWN: this.controller.processMoveDown(new MoveDownEvent(type));
                break;
            case GameEventType.MOVE_LEFT: this.controller.processMoveLeft(new MoveLeftEvent(type));
                break;
            case GameEventType.MOVE_RIGHT: this.controller.processMoveRight(new MoveRightEvent(type));
                break;
        }
    }


    set Controller(c: BoardController) {
        this.controller = c;
    }



}