import {fromEvent, Observable} from 'rxjs';
import { map } from 'rxjs/operators';

export abstract class KeyboardListener {

    abstract keyName: string;
    protected doc: HTMLDocument;

    constructor(d: HTMLDocument) {
        this.doc = d;
    }

    abstract keyPress(): Observable<boolean>;
    abstract keyUp(): Observable<boolean>;
}



export class KeyboardUp extends KeyboardListener {

    public keyName = 'ArrowUp';


    public keyPress(): Observable<boolean> {
        const source = fromEvent<KeyboardEvent>(this.doc, 'keydown');
        return source.pipe(map((event: KeyboardEvent) => event.key === this.keyName));
    }

    public keyUp(): Observable<boolean> {
        const source = fromEvent<KeyboardEvent>(this.doc, 'keyup');
        return source.pipe(map((event: KeyboardEvent) => event.key === this.keyName));
    }
}

export class KeyboardDown extends KeyboardListener {

    public keyName = 'ArrowDown';


    public keyPress(): Observable<boolean> {
        const source = fromEvent<KeyboardEvent>(this.doc, 'keydown');
        return source.pipe(map((event: KeyboardEvent) => event.key === this.keyName));
    }

    public keyUp(): Observable<boolean> {
        const source = fromEvent<KeyboardEvent>(this.doc, 'keyup');
        return source.pipe(map((event: KeyboardEvent) => event.key === this.keyName));
    }
}

export class KeyboardLeft extends KeyboardListener {

    public keyName = 'ArrowLeft';


    public keyPress(): Observable<boolean> {
        const source = fromEvent<KeyboardEvent>(this.doc, 'keydown');
        return source.pipe(map((event: KeyboardEvent) => event.key === this.keyName));
    }

    public keyUp(): Observable<boolean> {
        const source = fromEvent<KeyboardEvent>(this.doc, 'keyup');
        return source.pipe(map((event: KeyboardEvent) => event.key === this.keyName));
    }
}

export class KeyboardRight extends KeyboardListener {

    public keyName = 'ArrowRight';


    public keyPress(): Observable<boolean> {
        const source = fromEvent<KeyboardEvent>(this.doc, 'keydown');
        return source.pipe(map((event: KeyboardEvent) => event.key === this.keyName));
    }

    public keyUp(): Observable<boolean> {
        const source = fromEvent<KeyboardEvent>(this.doc, 'keyup');
        return source.pipe(map((event: KeyboardEvent) => event.key === this.keyName));
    }
}