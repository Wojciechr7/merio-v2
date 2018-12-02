export enum Key {
    UP = 0,
    DOWN = 1,
    LEFT = 2,
    RIGHT = 3
}

export namespace Key {
    export function toString(key: Key): number {
        switch(key) {
            case Key.UP: return 38;
            case Key.DOWN: return 40;
            case Key.LEFT: return 37;
            case Key.RIGHT: return 39;
        }
    }
}