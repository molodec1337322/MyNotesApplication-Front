import React, {useContext} from "react";
import {Draggable} from "react-beautiful-dnd";
import NoteCard from "../NoteCard/NoteCard";
import StrictModeDroppable from "../DroppableStrictModeForBDnD/DroppableStrictModeForBDnD";
import "./Column.css"
import {Alert} from "react-bootstrap";
import CreateNewNoteCardButton from "../NoteCard/CreateNewNoteCardButton";
import {AuthContext} from "../../context/AuthContext";

function Column({notes, col, handleOnDeleteNote, handleOnAddNote}){

    const {auth, setAuth} = useContext(AuthContext)

    let addCardBtn

    if(auth.isBoardOwner){
        if(notes.length >= 25){
            addCardBtn =
                <Alert variant="warning">
                    <Alert.Heading>Ой-ой!</Alert.Heading>
                    <p>
                        Кажется вы достигли лимита по созданию заметок. Если вы хотите создать новые, то вам придется удалить старие. Такие дела ¯\_(ツ)_/¯
                    </p>
                </Alert>
        }
        else {
            addCardBtn =
                <div className="d-flex justify-content-center">
                    <CreateNewNoteCardButton onAddNoteHandler={handleOnAddNote} columnId={col.id}/>
                </div>
        }
    }

    return(
        <div className="d-inline-block Columns">
            <h4>{col.name}</h4>
            <StrictModeDroppable droppableId={col.id.toString()} className="col-md-3">
                {(provided) => (
                    <div className="TaskColumn" {...provided.droppableProps} ref={provided.innerRef}>
                        {notes.filter(note => {
                            return note.columnId.toString() === col.id.toString()
                        })?.map((note, index) => {
                            note.orderPlace = index
                            return(
                                <Draggable key={note.id} draggableId={note.id.toString()} index={note.orderPlace}>
                                    {(provided) => (
                                        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                            <NoteCard note={note} onDeleteNoteHandler={handleOnDeleteNote}/>
                                        </div>
                                    )
                                    }
                                </Draggable>
                            )
                        })}
                        {provided.placeholder}
                        <br/>
                        {addCardBtn}
                    </div>
                )
                }
            </StrictModeDroppable>
        </div>
    );
}

export default Column;