import "jasmine";

import {JSDOM} from "jsdom";
import BoardModel from "../board-model";
import BoardView from "../../view/board-view";
import BoardController from "../../controller/board-controler";
import {MoveDownEvent, MoveLeftEvent, MoveRightEvent, MoveUpEvent} from "../../../common/game-event";
import {KeyboardLeft, KeyboardRight, KeyboardUp} from "../../view/keyboard-listener";

const dom = new JSDOM(`<div id="App"></div>`);

BoardView.prototype.Document = dom.window.document;


const boardModel = new BoardModel();
const boardView = new BoardView();

const boardController = new BoardController(boardModel, boardView);


describe("Process keyboard event", () => {
    it("should call controllers processMoveUp method", () => {
        spyOn(BoardController.prototype, 'processMoveUp');
        boardModel.processEvent(0);
        expect(boardController.processMoveUp).toHaveBeenCalled();
    });

    it("should call controllers processMoveDown method", () => {
        spyOn(BoardController.prototype, 'processMoveDown');
        boardModel.processEvent(1);
        expect(boardController.processMoveDown).toHaveBeenCalled();
    });

    it("should call controllers processMoveLeft method", () => {
        spyOn(BoardController.prototype, 'processMoveLeft');
        boardModel.processEvent(2);
        expect(boardController.processMoveLeft).toHaveBeenCalled();
    });

    it("should call controllers processMoveRight method", () => {
        spyOn(BoardController.prototype, 'processMoveRight');
        boardModel.processEvent(3);
        expect(boardController.processMoveRight).toHaveBeenCalled();
    });
});


describe("Process keyboard event", () => {
    it("should call controllers processMoveUp method with specified parameter", () => {
        spyOn(BoardController.prototype, 'processMoveUp');
        boardModel.processEvent(0);
        expect(boardController.processMoveUp).toHaveBeenCalledWith(new MoveUpEvent(0));
    });

    it("should call controllers processMoveDown method with specified parameter", () => {
        spyOn(BoardController.prototype, 'processMoveDown');
        boardModel.processEvent(1);
        expect(boardController.processMoveDown).toHaveBeenCalledWith(new MoveDownEvent(1));
    });

    it("should call controllers processMoveLeft method with specified parameter", () => {
        spyOn(BoardController.prototype, 'processMoveLeft');
        boardModel.processEvent(2);
        expect(boardController.processMoveLeft).toHaveBeenCalledWith(new MoveLeftEvent(2));
    });

    it("should call controllers processMoveRight method with specified parameter", () => {
        spyOn(BoardController.prototype, 'processMoveRight');
        boardModel.processEvent(3);
        expect(boardController.processMoveRight).toHaveBeenCalledWith(new MoveRightEvent(3));
    });
});



describe("Stop merio method", () => {
    it("should set released-left as true", () => {
        boardModel.released.left = false;
        boardModel.stopMerio(new KeyboardLeft(dom.window.document));
        expect(boardModel.released.left).toBe(true);
    });

    it("should set released-right as true", () => {
        boardModel.released.right = false;
        boardModel.stopMerio(new KeyboardRight(dom.window.document));
        expect(boardModel.released.right).toBe(true);
    });
});