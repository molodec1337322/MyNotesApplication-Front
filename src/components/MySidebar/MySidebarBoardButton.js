import React, {useContext} from "react";
import {Button} from "react-bootstrap";
import {AuthContext} from "../../context/AuthContext";

function MySidebarBoardButton({name, boardId, currentBoard, setCurrentBoard, onBoardChanged, isOwner}){

    return(
        <div>
            <Button variant="Light" className="mx-lg-2 mx-0 my-lg-0 my-2" onClick={() => {
                if(currentBoard !== boardId) {
                    setCurrentBoard(boardId)
                    onBoardChanged(name, boardId, isOwner)
                }
            }}>{name}</Button>
        </div>
    )
}

export default MySidebarBoardButton;