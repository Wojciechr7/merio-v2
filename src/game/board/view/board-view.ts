import { Injectable } from '../../../injector';
import GameService from "../../game-service";
import Canvas from "./canvas";
import BoardController from "../controller/board-controler";

import {KeyboardListener, KeyboardUp, KeyboardDown, KeyboardLeft, KeyboardRight} from "./keyboard-listener";
import {Subscription} from "rxjs";
import BoardModel from "../model/board-model";




@Injectable()
export default class BoardView {

    private canvas: Canvas;
    private controller!: BoardController;
    private model!: BoardModel;
    private keyListeners: Array<KeyboardListener>;
    readonly keyDownSubscriptions: Array<Subscription>;

    constructor(private gs: GameService) {
        this.canvas = new Canvas(document);
        this.keyListeners = [new KeyboardUp(document), new KeyboardDown(document), new KeyboardLeft(document), new KeyboardRight(document)];

        this.keyDownSubscriptions = this.keyListeners.map((listener: KeyboardListener, index: number) => {
            return this.createSubscription(listener, index);
        });

        this.keyListeners.map((listener: KeyboardListener, index: number) => {
            return listener.keyUp().subscribe((key: boolean) => {
                if (key) {
                    this.controller.stopKeypress(listener.keyName);
                    this.keyDownSubscriptions[index] = this.createSubscription(listener, index);
                }
            });
        });
    }

    private createSubscription(l: KeyboardListener, i: number) {
        return l.keyPress().subscribe((key: boolean) => {
            if (key) {
                this.model.processEvent(i);
                this.keyDownSubscriptions[i].unsubscribe();
            }
        });
    }

    set Controller(c: BoardController) {
        this.controller = c;
    }
    set Model(m: BoardModel) {
        this.model = m;
    }

    get Canvas(): HTMLElement {
        return this.canvas.Cvs;
    }

    public updateCanvas() {
        console.log('update canvas');
    }





}