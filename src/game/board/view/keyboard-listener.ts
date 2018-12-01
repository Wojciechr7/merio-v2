import {fromEvent, Observable} from 'rxjs';
import { map } from 'rxjs/operators';

export abstract class KeyboardListener {

    abstract keyName: string;

    abstract keyPress(): Observable<boolean>;
    abstract keyUp(): Observable<boolean>;
}



export class KeyboardUp implements KeyboardListener {

    public keyName = 'ArrowUp';


    public keyPress(): Observable<boolean> {
        const source = fromEvent<KeyboardEvent>(document, 'keydown');
        return source.pipe(map((event: KeyboardEvent) => event.key === this.keyName));
    }

    public keyUp(): Observable<boolean> {
        const source = fromEvent<KeyboardEvent>(document, 'keyup');
        return source.pipe(map((event: KeyboardEvent) => event.key === this.keyName));
    }

}
export class KeyboardDown implements KeyboardListener {

    public keyName = 'ArrowDown';


    public keyPress(): Observable<boolean> {
        const source = fromEvent<KeyboardEvent>(document, 'keydown');
        return source.pipe(map((event: KeyboardEvent) => event.key === this.keyName));
    }

    public keyUp(): Observable<boolean> {
        const source = fromEvent<KeyboardEvent>(document, 'keyup');
        return source.pipe(map((event: KeyboardEvent) => event.key === this.keyName));
    }

}

export class KeyboardLeft implements KeyboardListener {

    public keyName = 'ArrowLeft';


    public keyPress(): Observable<boolean> {
        const source = fromEvent<KeyboardEvent>(document, 'keydown');
        return source.pipe(map((event: KeyboardEvent) => event.key === this.keyName));
    }

    public keyUp(): Observable<boolean> {
        const source = fromEvent<KeyboardEvent>(document, 'keyup');
        return source.pipe(map((event: KeyboardEvent) => event.key === this.keyName));
    }

}

export class KeyboardRight implements KeyboardListener {

    public keyName = 'ArrowRight';


    public keyPress(): Observable<boolean> {
        const source = fromEvent<KeyboardEvent>(document, 'keydown');
        return source.pipe(map((event: KeyboardEvent) => event.key === this.keyName));
    }

    public keyUp(): Observable<boolean> {
        const source = fromEvent<KeyboardEvent>(document, 'keyup');
        return source.pipe(map((event: KeyboardEvent) => event.key === this.keyName));
    }

}