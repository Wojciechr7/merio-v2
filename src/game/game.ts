import '../../styles/style.scss';
import BoardControler from "./board/controller/board-controler";
import {Injector} from "../injector";


const boardController = Injector.resolve(BoardControler);




(module as any).hot.accept(() => {
    window.location.reload();
});



