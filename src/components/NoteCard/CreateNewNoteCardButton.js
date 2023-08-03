import React, {useState} from "react";
import {Button} from "react-bootstrap";
import MyModal from "../Modal/MyModal";
import CreateNewNoteWindow from "./CreateNewNoteWindow";

function CreateNewNoteCardButton({onAddNoteHandler, columnId, boardId}){

    const [isModalActive, setModalActive] = useState(false)

    function CreateNewNote(e){
        e.persist()
        setModalActive(true)
    }

    return(
        <div>
            <Button variant="outline-success" className="rounded-circle btn-lg" onClick={CreateNewNote}>+</Button>
            <MyModal active={isModalActive} setActive={setModalActive}>
                <CreateNewNoteWindow setActive={setModalActive} onAddNoteHandler={onAddNoteHandler} columnId={columnId} boardId={boardId}/>
            </MyModal>
        </div>
    )
}

export default CreateNewNoteCardButton;