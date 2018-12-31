import {Injectable} from "../../../injector";
import io from 'socket.io-client';
import Socket = SocketIOClient.Socket;
import {fromEvent, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {ICommand} from "../../common/interfaces/command.interface";
import {IRemoteEvent} from "../../common/interfaces/remote-event.interface";

@Injectable()
export default class RemoteService {

    private socket: Socket;

    constructor() {
        this.socket = io('http://localhost:3000');
    }

    public getKeydownRemote(): Observable<IRemoteEvent> {
        return fromEvent<ICommand>(this.socket, 'move-command')
            .pipe(map((move: ICommand) => {
                return {
                    command: move.command,
                    type: 'keydown'
                }
            }));
    }

    public getKeyupRemote(): Observable<IRemoteEvent> {
        return fromEvent<ICommand>(this.socket, 'stop-command')
            .pipe(map((move: ICommand) => {
                return {
                    command: move.command,
                    type: 'keyup'
                }
            }));
    }

}