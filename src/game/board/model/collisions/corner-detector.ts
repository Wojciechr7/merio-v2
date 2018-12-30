import {CollisionDetector} from "./collision-detector";
import SAT from "sat";



export default class CornerDetector extends CollisionDetector{

    protected handleResponse(res: SAT.Response): boolean {
        return !!(res.overlap === 0 && res.a);
    }


}