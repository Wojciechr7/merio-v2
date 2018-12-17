import {Injectable} from '../../../injector';
import GameService from "../../game-service";
import Canvas from "./canvas";
import BoardController from "../controller/board-controler";

import {KeyboardListener, KeyboardUp, KeyboardDown, KeyboardLeft, KeyboardRight} from "./keyboard-listener";
import {Subscription} from "rxjs";
import BoardModel from "../model/board-model";
import {Iposition} from "../../common/interfaces/position.interface";
import {SPRITE_SIZE} from "../../common/const";


@Injectable()
export default class BoardView {

    private canvas: Canvas;
    private controller!: BoardController;
    private model!: BoardModel;
    private keyListeners: Array<KeyboardListener>;
    readonly keyDownSubscriptions: Array<Subscription>;
    private document!: HTMLDocument;
    public merioImage: HTMLImageElement;


    constructor(private gs?: GameService) {
        //this.merioImage = new Image();
        this.merioImage = this.document.createElement('img');
        this.merioImage.src = 'https://i.ibb.co/XYBHBRP/merio.png';


        this.canvas = new Canvas(this.document);




        this.keyListeners = [
            new KeyboardUp(this.document),
            new KeyboardDown(this.document),
            new KeyboardLeft(this.document),
            new KeyboardRight(this.document)];

        this.keyDownSubscriptions = this.keyListeners.map((listener: KeyboardListener, index: number) => {
            return this.createSubscription(listener, index);
        });

        this.keyListeners.map((listener: KeyboardListener, index: number) => {
            return listener.keyUp().subscribe((key: boolean) => {
                if (key) {
                    this.keyDownSubscriptions[index] = this.createSubscription(listener, index);
                    this.model.processKeyUpEvent(listener);
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

    set Document(d: HTMLDocument) {
        this.document = d;
    }

    public clearMerio(walk: any, pos: Iposition) {
        //console.log('clear');
        const data = {
            ws: walk.side,
            posx: pos.x - 1,
            posy: pos.y,
            size: SPRITE_SIZE.MERIO
        };
        this.canvas.Ctx.clearRect(data.ws * data.posx, data.posy, SPRITE_SIZE.MERIO, SPRITE_SIZE.MERIO + 5);
    }


    public drawMerio(pos: Iposition): void {
        const data = {
            ws: this.model.Walk.side,
            asx: this.model.ActualSprite.x,
            asy: this.model.ActualSprite.y,
            size: SPRITE_SIZE.MERIO
        };
        this.canvas.Ctx.save();
        this.canvas.Ctx.scale(data.ws, 1);
        this.canvas.Ctx.drawImage(this.merioImage, data.asx, data.asy, data.size, data.size, pos.x, pos.y, data.ws * data.size, data.size);
        this.canvas.Ctx.restore();
        requestAnimationFrame(this.drawMerio.bind(this, pos));

    }


}