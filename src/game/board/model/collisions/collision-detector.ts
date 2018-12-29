import {Iposition} from "../../../common/interfaces/position.interface";
import SAT from 'sat';
import {POSITION} from "../../../common/const";
import {ICollision} from "../../../common/interfaces/collision.interface";
import Polygon = SAT.Polygon;


export abstract class CollisionDetector {

    private pos: Iposition;
    readonly tubePolygon: Polygon;
    private merioPolygon!: Polygon;

    protected constructor(pos: Iposition) {
        this.pos = pos;

        this.tubePolygon = new SAT.Polygon(new SAT.Vector(), [
            new SAT.Vector(POSITION.TUBE.x + 4, POSITION.TUBE.y + 62),
            new SAT.Vector(POSITION.TUBE.x + 4, POSITION.TUBE.y + 29),
            new SAT.Vector(POSITION.TUBE.x, POSITION.TUBE.y + 26),
            new SAT.Vector(POSITION.TUBE.x, POSITION.TUBE.y),
            new SAT.Vector(POSITION.TUBE.x + 62, POSITION.TUBE.y),
            new SAT.Vector(POSITION.TUBE.x + 62, POSITION.TUBE.y + 26),
            new SAT.Vector(POSITION.TUBE.x + 58, POSITION.TUBE.y + 29),
            new SAT.Vector(POSITION.TUBE.x + 58, POSITION.TUBE.y + 62)
        ]);
    }


    public detect(): boolean {
        this.merioPolygon = new SAT.Polygon(new SAT.Vector(), [
            new SAT.Vector(Math.abs(this.pos.x), this.pos.y + 38),
            new SAT.Vector(Math.abs(this.pos.x), this.pos.y),
            new SAT.Vector(Math.abs(this.pos.x) + 38, this.pos.y),
            new SAT.Vector(Math.abs(this.pos.x) + 38, this.pos.y + 38)
        ]);
        let response = new SAT.Response();
        SAT.testPolygonPolygon(this.merioPolygon, this.tubePolygon, response);
        //console.log(response);

        return this.handleResponse(response);
    }

    protected abstract handleResponse(res: SAT.Response): boolean;


    public init(): ICollision {
        return {
            left: false,
            right: false,
            bottom: false
        }
    }


}