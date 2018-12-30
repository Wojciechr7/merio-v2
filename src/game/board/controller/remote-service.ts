import {Injectable} from "../../../injector";
import io from 'socket.io-client';
import Socket = SocketIOClient.Socket;
import {fromEvent, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {ICommand} from "../../common/interfaces/command.interface";

@Injectable()
export default class RemoteService {

    private socket: Socket;

    constructor() {
        this.socket = io('http://localhost:3000');
    }

    public getKeydownRemote(): Observable<string> {
        return fromEvent<ICommand>(this.socket, 'move-command')
            .pipe(map((move: ICommand) => move.command));
    }

    public getKeyupRemote(): Observable<string> {
        return fromEvent<ICommand>(this.socket, 'stop-command')
            .pipe(map((move: ICommand) => move.command));
    }

}