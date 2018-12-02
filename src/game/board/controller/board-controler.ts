import BoardModel from "../model/board-model";
import BoardView from "../view/board-view";
import {Injectable} from "../../../injector";
import {
    GameEvent,
    MoveUpEvent
} from "../../common/game-event";



@Injectable()
export default class BoardController {

    constructor(private model: BoardModel, private view: BoardView) {
        view.Controller = this;
        view.Model = model;
        model.Controller = this;


    }

    public processMoveUp(event: MoveUpEvent) {
        console.log(event);
        this.model.doSomething();
        this.view.updateCanvas();
    }
    public processMoveDown(event: MoveUpEvent) {
        console.log(event);
        this.model.doSomething();
        this.view.updateCanvas();
    }
    public processMoveLeft(event: MoveUpEvent) {
        console.log(event);
        this.model.doSomething();
        this.view.updateCanvas();
    }
    public processMoveRight(event: MoveUpEvent) {
        console.log(event);
        this.model.doSomething();
        this.view.updateCanvas();
    }



    public handleKeypress(key: GameEvent): void {

        console.log(key);

        //this.model.doSomething();

        //this.view.updateCanvas();
    }

    public stopKeypress(key: string) {
        console.log('stop', key);
    }


}