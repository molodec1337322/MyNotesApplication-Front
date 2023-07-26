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
        if(!result.destination){
            return;
        }

        if(result.destination.droppableId === result.source.droppableId && result.destination.index === result.source.index){
            return;
        }

        if(result.destination.droppableId === result.source.droppableId){
            const items = Array.from(notes.filter(note => {return note.columnId.toString() === result.source.droppableId.toString()}))
            const otherItems = Array.from(notes.filter(note => {return note.columnId.toString() !== result.source.droppableId.toString()}))

            const [reorderedItem] = items.splice(result.source.index, 1)
            reorderedItem.orderPlace = result.destination.index
            items.splice(result.destination.index, 0, reorderedItem)
            const allItems = [...otherItems, ...items]
            console.log(notes)
            console.log(allItems)
            console.log("++++++++++++++")
            setNotes(allItems)
        }
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
            id: columns.length.toString(),
            name: name,
            orderPlace: columns.length
        }
        setColumns([...columns, newColumn])
    }

    return(
        <div className="NoteCardListBackground container-fluid d-flex ow-cols-3 justify-content-center">
            <DragDropContext onDragEnd={handleOnDragEnd}>
                {columns?.map((column, index) => (
                    <Column notes={notes} col={column} handleOnDeleteNote={handleOnDeleteNote} handleOnAddNote={handleOnAddNote}></Column>
                ))}
            </DragDropContext>
            <CreateNewColumnBtn onAddColumnHandler={handleOnAddColumn}/>
        </div>
    )
}

export default ColumnsPlaceholder;