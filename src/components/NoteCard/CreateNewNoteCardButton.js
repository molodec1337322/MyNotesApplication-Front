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

            <Button variant="outline-success" className="rounded-circle btn-lg" onClick={CreateNewNote}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="46" fill="currentColor"
                     className="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                          d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                </svg>
            </Button>
            <MyModal active={isModalActive} setActive={setModalActive}>
                <CreateNewNoteWindow setActive={setModalActive} onAddNoteHandler={onAddNoteHandler} columnId={columnId} boardId={boardId}/>
            </MyModal>
        </div>
    )
}

export default CreateNewNoteCardButton;