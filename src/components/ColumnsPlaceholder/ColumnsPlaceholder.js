import React, {useContext, useState} from "react";
import {DragDropContext, Draggable} from "react-beautiful-dnd";
import StrictModeDroppable from "../DroppableStrictModeForBDnD/DroppableStrictModeForBDnD";
import NoteCard from "../NoteCard/NoteCard";
import {Alert} from "react-bootstrap";
import CreateNewNoteCardButton from "../NoteCard/CreateNewNoteCardButton";
import Column from "../Column/Column";
import CreateNewColumnBtn from "../Column/CreateNewColumnBtn";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import {consts} from "../../config/consts";

function ColumnsPlaceholder({columns, setColumns, notes, setNotes, currentBoardId}){

    const {auth, setAuth} = useContext(AuthContext)

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

            setNotes(allItems)
        }
        else{
            const itemsStart = Array.from(notes.filter(note => {return note.columnId.toString() === result.source.droppableId.toString()}))
            const itemsEnd = Array.from(notes.filter(note => {return note.columnId.toString() === result.destination.droppableId.toString()}))
            const otherItems = Array.from(notes.filter(note => {
                return note.columnId.toString() !== result.source.droppableId.toString() && note.columnId.toString() !== result.destination.droppableId.toString()
            }))

            const [reorderedItem] = itemsStart.splice(result.source.index, 1)
            reorderedItem.orderPlace = result.destination.index
            reorderedItem.columnId = result.destination.droppableId
            itemsEnd.splice(result.destination.index, 0, reorderedItem)

            const allItems = [...otherItems, ...itemsStart, ...itemsEnd]

            setNotes(allItems)
        }
    }

    function handleOnDeleteNote(id){
        let items = Array.from(notes)
        items.splice(items.findIndex(note => note.id === id), 1)
        setNotes(items)
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

    async function handleOnAddColumn(name){
        /*
        let newColumn = {
            id: columns.length.toString(),
            name: name,
            orderPlace: columns.length
        }
        setColumns([...columns, newColumn])

         */

        let newColumn = {
            name: name,
            orderPlace: columns.length,
            boardId: currentBoardId
        }

        let resp = await axios.post(consts.API_SERVER + "/api/v1/Columns/Create",
            newColumn,
            {headers: {
                    Authorization: auth.token
                }
            })

        setColumns(prev => {
            return[
                ...prev,
                resp.data
            ]
        })

    }

    let addCol
    if(auth.isBoardOwner){
        addCol =
            <CreateNewColumnBtn onAddColumnHandler={handleOnAddColumn}/>
    }

    return(
        <div className="NoteCardListBackground container-fluid d-flex ow-cols-3 justify-content-center">
            <DragDropContext onDragEnd={handleOnDragEnd}>
                {columns?.map((column, index) => (
                    <Column notes={notes} col={column} handleOnDeleteNote={handleOnDeleteNote} handleOnAddNote={handleOnAddNote}></Column>
                ))}
            </DragDropContext>
            {addCol}
        </div>
    )
}

export default ColumnsPlaceholder;