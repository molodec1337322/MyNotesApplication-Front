import React from "react";
import {Button} from "react-bootstrap";

function MySidebarBoardButton({name, boardId, currentBoard, setCurrentBoard, onBoardChanged, isOwner}){

    return(
        <div>
            <Button variant="link" className="mx-lg-2 mx-0 my-lg-0 my-2" onClick={() => {
                if(currentBoard !== boardId) {
                    setCurrentBoard(boardId)
                    onBoardChanged(boardId, isOwner)
                }
            }}>{name}</Button>
        </div>
    )
}

export default MySidebarBoardButton;