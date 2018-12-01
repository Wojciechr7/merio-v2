import BoardModel from "../model/board-model";
import BoardView from "../view/board-view";
import {Injectable} from "../../../injector";


@Injectable()
export default class BoardController {

    constructor(private model: BoardModel, private view: BoardView) {
        view.Controller = this;

    }

    public handleKeypress(key: string): void {

        this.model.doSomething();

        this.view.updateCanvas();
    }


}