import {Key} from "./key";


export enum GameEventType {
    MOVE_UP,
    MOVE_DOWN,
    MOVE_LEFT,
    MOVE_RIGHT
}


export class GameEvent {
    constructor(public readonly type: GameEventType) { }
}

export class MoveUpEvent extends GameEvent {
    constructor(public readonly keyCode: Key) {
        super(GameEventType.MOVE_UP);
        this.keyCode = Key.toString(keyCode);
    }
}

export class MoveDownEvent extends GameEvent {
    constructor(public readonly keyCode: Key) {
        super(GameEventType.MOVE_DOWN);
        this.keyCode = Key.toString(keyCode);
    }
}

export class MoveLeftEvent extends GameEvent {
    constructor(public readonly keyCode: Key) {
        super(GameEventType.MOVE_LEFT);
        this.keyCode = Key.toString(keyCode);
    }
}

export class MoveRightEvent extends GameEvent {
    constructor(public readonly keyCode: Key) {
        super(GameEventType.MOVE_RIGHT);
        this.keyCode = Key.toString(keyCode);
    }
}