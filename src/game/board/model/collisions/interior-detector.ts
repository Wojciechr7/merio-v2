import {CollisionDetector} from "./collision-detector";
import {Iposition} from "../../../common/interfaces/position.interface";
import SAT from "sat";



export default class InteriorDetector extends CollisionDetector{

    constructor(pos: Iposition) {
        super(pos);
    }

    protected handleResponse(res: SAT.Response): boolean {
        return !!(res.overlap >= 2 && res.a);
    }


}