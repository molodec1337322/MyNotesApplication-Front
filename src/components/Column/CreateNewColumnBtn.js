import React, {useState} from "react";
import {Button} from "react-bootstrap";
import MyModal from "../../Modal/MyModal";
import CreateNewColumnWindow from "./CreateNewColumnWindow";

function CreateNewColumnBtn({onAddNewColumnHandler}){
    const [isModalActive, setModalActive] = useState(false)

    function CreateNewNote(e){
        e.persist()
        setModalActive(true)
    }

    return(
        <div className="CreateNewNoteCard">
            <Button variant="outline-success" className="rounded-circle btn-lg" onClick={CreateNewNote}>+</Button>
            <MyModal active={isModalActive} setActive={setModalActive}>
                <CreateNewColumnWindow setActive={setModalActive} onAddNoteHandler={onAddNewColumnHandler}/>
            </MyModal>
        </div>
    )
}

export default CreateNewColumnBtn;