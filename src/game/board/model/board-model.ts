import { Injector, Injectable, Constructor } from '../../../injector';
import GameService from "../../game-service";

@Injectable()
export default class BoardModel {

    constructor(private gs: GameService) {

    }

    public doSomething() {
        console.log('something');
    }



}