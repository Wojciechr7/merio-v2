import { GameEvent } from "./game-event";

export default interface EventProcessor {
    processEvent(type: number): void;
}