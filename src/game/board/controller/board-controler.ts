import BoardModel from "../model/board-model";
import BoardView from "../view/board-view";
import {Injectable} from "../../../injector";
import {MoveUpEvent} from "../../common/game-event";
import {KeyboardListener} from "../view/keyboard-listener";
import RemoteService from "./remote-service";


@Injectable()
export default class BoardController {



    constructor(private model: BoardModel, private view: BoardView, private rs: RemoteService) {
        view.Controller = this;
        view.Model = model;
        model.Controller = this;
        model.View = view;
        this.view.merioImage.onload = () => {
            this.view.drawBoard(this.model.MerioPos);
        };

        this.rs.getKeydownRemote().subscribe((command: string) => {
            console.log(command);
            // TODO: it is possible to optimize
            switch (command) {
                case 'move-right':
                    document.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowRight'}));
                    break;
                case 'move-left':
                    document.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowLeft'}));
                    break;
                case 'move-up':
                    document.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowUp'}));
                    break;
                default:
                    break;
            }
        });

        this.rs.getKeyupRemote().subscribe((command: string) => {
            switch (command) {
                case 'move-right':
                    document.dispatchEvent(new KeyboardEvent('keyup', {key: 'ArrowRight'}));
                    break;
                case 'move-left':
                    document.dispatchEvent(new KeyboardEvent('keyup', {key: 'ArrowLeft'}));
                    break;
                case 'move-up':
                    document.dispatchEvent(new KeyboardEvent('keyup', {key: 'ArrowUp'}));
                    break;
                default:
                    break;
            }
        });

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