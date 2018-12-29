import {Injectable} from '../../../injector';
import Canvas from "./canvas";
import BoardController from "../controller/board-controler";
import {KeyboardListener, KeyboardUp, KeyboardDown, KeyboardLeft, KeyboardRight} from "./keyboard-listener";
import {Subscription} from "rxjs";
import BoardModel from "../model/board-model";
import {Iposition} from "../../common/interfaces/position.interface";
import {POSITION, SPRITE_SIZE, SPRITES} from "../../common/const";
import {WalkSide} from "../../common/interfaces/walk.interface";


@Injectable()
export default class BoardView {

    private canvas: Canvas;
    private controller!: BoardController;
    private model!: BoardModel;
    private keyListeners: Array<KeyboardListener>;
    readonly keyDownSubscriptions: Array<Subscription>;
    private document!: HTMLDocument;
    public merioImage: HTMLImageElement;


    constructor() {
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

    private createSubscription(l: KeyboardListener, i: number): Subscription {
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

    public clearMerio(walk: WalkSide, {x, y}: Iposition): void {
        //console.log('clear');

        this.canvas.Ctx.clearRect(walk.side * x - 1, y, SPRITE_SIZE.MERIO, SPRITE_SIZE.MERIO + 5);
    }


    public drawBoard(pos: Iposition): void {

        // draw tube
        this.canvas.Ctx.drawImage(this.merioImage, SPRITES.TUBE.x, SPRITES.TUBE.y, SPRITE_SIZE.TUBE, SPRITE_SIZE.TUBE, POSITION.TUBE.x, POSITION.TUBE.y, SPRITE_SIZE.TUBE, SPRITE_SIZE.TUBE);

        this.canvas.Ctx.save();
        this.canvas.Ctx.scale(this.model.Walk.side, 1);

        // draw merio
        this.canvas.Ctx.drawImage(this.merioImage, this.model.ActualSprite.x, this.model.ActualSprite.y, SPRITE_SIZE.MERIO, SPRITE_SIZE.MERIO, pos.x, pos.y, this.model.Walk.side * SPRITE_SIZE.MERIO, SPRITE_SIZE.MERIO);
        this.canvas.Ctx.restore();

        requestAnimationFrame(this.drawBoard.bind(this, pos));
    }


}