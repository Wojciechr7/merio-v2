import {CollisionDetector} from "./collision-detector";
import SAT from "sat";



export default class InteriorDetector extends CollisionDetector{

    protected handleResponse(res: SAT.Response): boolean {
        return !!(res.overlap >= 2 && res.a);
    }


}