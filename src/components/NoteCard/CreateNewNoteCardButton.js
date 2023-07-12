import React, {useState} from "react";
import {Button} from "react-bootstrap";
import MyModal from "../../Modal/MyModal";
import CreateNewNoteWindow from "./CreateNewNoteWindow";

function CreateNewNoteCardButton(notes, {onAddNoteHandler}){

    console.log({onAddNoteHandler})
    const [isModalActive, setModalActive] = useState(false)

    function CreateNewNote(e){
        e.persist()
        setModalActive(true)
    }

    return(
        <div className="CreateNewNoteCard">
            <Button variant="outline-success" className="rounded-circle btn-lg" onClick={CreateNewNote}>+</Button>
            <MyModal active={isModalActive} setActive={setModalActive}>
                <CreateNewNoteWindow notesList={notes} active={isModalActive} onAddNoteHandler={onAddNoteHandler}/>
            </MyModal>
        </div>
    )
}

export default CreateNewNoteCardButton;