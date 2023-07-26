import React, {useState} from "react";
import {DragDropContext, Draggable} from "react-beautiful-dnd";
import StrictModeDroppable from "../DroppableStrictModeForBDnD/DroppableStrictModeForBDnD";
import NoteCard from "../NoteCard/NoteCard";
import {Alert} from "react-bootstrap";
import CreateNewNoteCardButton from "../NoteCard/CreateNewNoteCardButton";
import Column from "../Column/Column";
import CreateNewColumnBtn from "../Column/CreateNewColumnBtn";

function ColumnsPlaceholder({columns, setColumns, notes, setNotes}){

    function handleOnDragEnd(result){

    }

    function handleOnDeleteNote(id, type){

    }

    function handleOnAddNote(title, text, columnId){
        let newNote = {
            id: notes.length,
            title: title,
            text: text,
            orderPlace: notes.filter(note => {return note.columnId === columnId}).length,
            columnId: columnId
        }
        setNotes([...notes, newNote])
    }

    function handleOnAddColumn(name){
        let newColumn = {
            id: columns.length,
            name: name,
            orderPlace: columns.length
        }
        setColumns([...columns, newColumn])
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
                <CreateNewNoteCardButton onAddNoteHandler={handleOnAddNote}/>
            </div>
    }

    return(
        <div className="NoteCardListBackground container-fluid d-flex ow-cols-3 justify-content-center">
            <DragDropContext onDragEnd={handleOnDragEnd}>
                {columns?.map((column, index) => (
                    <Column notes={notes} col={column} handleOnDeleteNote={handleOnDeleteNote} handleOnAddNote={handleOnAddNote} addCardBtn={addCardBtn}></Column>
                ))}
            </DragDropContext>
            <CreateNewColumnBtn onAddColumnHandler={handleOnAddColumn}/>
        </div>
    )
}

export default ColumnsPlaceholder;