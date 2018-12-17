import BoardModel from "../model/board-model";
import BoardView from "../view/board-view";
import {Injectable} from "../../../injector";
import {MoveUpEvent} from "../../common/game-event";
import {KeyboardListener} from "../view/keyboard-listener";


@Injectable()
export default class BoardController {



    constructor(private model: BoardModel, private view: BoardView) {
        view.Controller = this;
        view.Model = model;
        model.Controller = this;
        model.View = view;
        this.view.merioImage.onload = () => {
            this.view.drawMerio(this.model.MerioPos);
        };


    }

    public processMoveUp(event: MoveUpEvent) {
        if (!this.model.isJumping()) {
            this.model.jumpAnimation();
            this.model.jump();
        }

    }
    public processMoveDown(event: MoveUpEvent) {
        console.log(event);
    }
    public processMoveLeft(event: MoveUpEvent) {
        this.model.walkLeftSwitchSprite();
        this.model.walkLeft();
    }
    public processMoveRight(event: MoveUpEvent) {
        this.model.walkRightSwitchSprite();
        this.model.walkRight();
    }

    public stopKeypress(listener: KeyboardListener) {
        this.model.stopMerio(listener);
    }


}