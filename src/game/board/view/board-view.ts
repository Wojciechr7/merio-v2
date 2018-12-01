import { Injectable } from '../../../injector';
import GameService from "../../game-service";
import {Canvas} from "./canvas";
import BoardController from "../controller/board-controler";
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';




@Injectable()
export default class BoardView {

    private canvas: Canvas;
    private controller!: BoardController;

    constructor(private gs: GameService) {
        this.canvas = new Canvas();

        const source = fromEvent<KeyboardEvent>(document, 'keydown');
        const keyPressed = source.pipe(map((event: KeyboardEvent) => event.key));
        keyPressed.subscribe((key: string) => {
            this.controller.handleKeypress(key);
        });

    }

    set Controller(c: BoardController) {
        this.controller = c;
    }

    get Canvas(): HTMLElement {
        return this.canvas.Cvs;
    }

    public updateCanvas() {
        console.log('update canvas');
    }





}