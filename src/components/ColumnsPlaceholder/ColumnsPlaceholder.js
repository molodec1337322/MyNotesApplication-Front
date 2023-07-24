import React, {useState} from "react";
import {DragDropContext, Draggable} from "react-beautiful-dnd";
import StrictModeDroppable from "../DroppableStrictModeForBDnD/DroppableStrictModeForBDnD";
import NoteCard from "../NoteCard/NoteCard";
import {Alert} from "react-bootstrap";
import CreateNewNoteCardButton from "../NoteCard/CreateNewNoteCardButton";
import Column from "../Column/Column";

function ColumnsPlaceholder({columns, notes}){

    const [cols, setCols] = useState([
        {
            id: 0,
            name: "to Do",
            orderPalce: 0
        },
        {
            id: 1,
            name: "in progress",
            orderPalce: 1
        }
    ])

    function handleOnDragEnd(result){

    }

    function handleOnDeleteNote(id, type){

    }

    function handleOnAddNote(title, text){

    }

    let addCardBtn
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
                <CreateNewNoteCardButton notes={notes} onAddNoteHandler={handleOnAddNote}/>
            </div>
    }

    return(
        <div className="NoteCardListBackground container-fluid d-flex ow-cols-3 justify-content-center">
            <DragDropContext onDragEnd={handleOnDragEnd}>
                {cols.?map((column, index) => {
                <Column notes={notes} col={column} handleOnDeleteNote={handleOnDeleteNote} addCardBtn={handleOnAddNote}></Column>
            })}
            </DragDropContext>
        </div>
    )
}

export default ColumnsPlaceholder;