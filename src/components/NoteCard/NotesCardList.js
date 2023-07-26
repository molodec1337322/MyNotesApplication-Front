import React, {useContext, useState} from "react";
import "./NoteCardList.css"
import NoteCard from "./NoteCard";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import StrictModeDroppable from "../DroppableStrictModeForBDnD/DroppableStrictModeForBDnD";
import CreateNewNoteCardButton from "./CreateNewNoteCardButton";
import {Alert} from "react-bootstrap";
import {AuthContext} from "../../context";

/*



!!!!!!!!!!!!!!!!!!!!!!!!




УБРАТЬ ИЗ ИСПОЛЬЗОВАНИЯ
!!!!!!!!
!!!!!!!!!











!!!!!!!!!!
 */
function NotesCardList({notes, setNotes, notesLimit}){

    const {auth, setAuth} = useContext(AuthContext)

    const [toDoNotes, setToDoNotes] = useState(notes.filter(note => {
        return note.type === "ToDo"
    }).sort((a, b) => parseFloat(a.order) - parseFloat(b.order)))
    const [gotInWorkNotes, setGotInWorkNotes] = useState(notes.filter(note => {
        return note.type === "GotInWork"
    }).sort((a, b) => parseFloat(a.order) - parseFloat(b.order)))
    const [inProgressNotes, setInProgressNotes] = useState(notes.filter(note => {
        return note.type === "InProgress"
    }).sort((a, b) => parseFloat(a.order) - parseFloat(b.order)))
    const [doneNotes, setDoneNotes] = useState(notes.filter(note => {
        return note.type === "Done"
    }).sort((a, b) => parseFloat(a.order) - parseFloat(b.order)))


    let map = new Map()
    map.set("ToDo", [toDoNotes, setToDoNotes])
    map.set("GotInWork", [gotInWorkNotes, setGotInWorkNotes])
    map.set("InProgress", [inProgressNotes, setInProgressNotes])
    map.set("Done", [doneNotes, setDoneNotes])

    function handleOnDragEnd(result){

        if(!result.destination){
            return;
        }

        if(result.destination.droppableId === result.source.droppableId){
            const items = Array.from(map.get(result.source.droppableId).at(0))
            const [reorderedItem] = items.splice(result.source.index, 1)
            items.splice(result.destination.index, 0, reorderedItem)
            map.get(result.destination.droppableId).at(1)(items)
        }
        else{
            const sourceItems = Array.from(map.get(result.source.droppableId).at(0))
            const [reorderedItem] = sourceItems.splice(result.source.index, 1)
            map.get(result.source.droppableId).at(1)(sourceItems)

            const destItems = Array.from(map.get(result.destination.droppableId).at(0));
            [reorderedItem].at(0).type = result.destination.droppableId
            destItems.splice(result.destination.index, 0, [reorderedItem].at(0))
            map.get(result.destination.droppableId).at(1)(destItems)
        }
    }

    function handleOnAddNote(title, text){
        let newNoteObj = {
            id: notes.length,
            title: title,
            body: text,
            type: "ToDo",
            order: notes.filter(note => {return note.type === "ToDo"}).length,
        }
        setNotes([...notes, newNoteObj])
        setToDoNotes([...toDoNotes, newNoteObj])
    }

    function handleOnDeleteNote(id, type){

        const allItems = Array.from(notes)
        const allItemsIdToDel = allItems.findIndex(note => {return note.id === id})
        allItems.splice(allItemsIdToDel, 1)
        setNotes(allItems)

        const items = Array.from(map.get(type).at(0))
        const itemIdToDel = items.findIndex(note => {return note.id === id})
        items.splice(itemIdToDel, 1)
        map.get(type).at(1)(items)
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
                <div className="d-inline-block NotesCards">
                    <h4>Задачи</h4>
                    <StrictModeDroppable droppableId="ToDo" className="col-md-3">
                        {(provided) => (
                            <div className="ToDo" {...provided.droppableProps} ref={provided.innerRef}>
                                {toDoNotes?.map((note, index) => {
                                    console.log(note.id.toString())
                                    note.order = index
                                    return(
                                        <Draggable key={note.id} draggableId={note.id.toString()} index={note.order}>
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
                <div className="d-inline-block NotesCards">
                    <h4>Взято в работу</h4>
                    <StrictModeDroppable droppableId="GotInWork" className="col-md-3">
                        {(provided) => (
                            <div className="GotInWork" {...provided.droppableProps} ref={provided.innerRef}>
                                {gotInWorkNotes?.map((note, index) => {
                                    note.order = index
                                    return(
                                        <Draggable key={note.id} draggableId={note.id.toString()} index={note.order}>
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
                            </div>
                        )
                        }
                    </StrictModeDroppable>
                </div>
                <div className="d-inline-block NotesCards">
                    <h4>В процессе</h4>
                    <StrictModeDroppable droppableId="InProgress" className="col-md-3">
                        {(provided) => (
                            <div className="InProgress" {...provided.droppableProps} ref={provided.innerRef}>
                                {inProgressNotes?.map((note, index) => {
                                    note.order = index
                                    return(
                                        <Draggable key={note.id} draggableId={note.id.toString()} index={note.order}>
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
                            </div>
                        )
                        }
                    </StrictModeDroppable>
                </div>
                <div className="d-inline-block NotesCards">
                    <h4 className="justify-content-center">Выполнено</h4>
                    <StrictModeDroppable droppableId="Done" className="col-md-3">
                        {(provided) => (
                            <div className="Done" {...provided.droppableProps} ref={provided.innerRef}>
                                {doneNotes?.map((note, index) => {
                                    note.order = index
                                    return(
                                        <Draggable key={note.id} draggableId={note.id.toString()} index={note.order}>
                                            {
                                                (provided) => (
                                                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                    <NoteCard note={note} onDeleteNoteHandler={handleOnDeleteNote}/>
                                                </div>
                                            )
                                            }
                                        </Draggable>
                                    )
                                })}
                                {provided.placeholder}
                            </div>
                        )
                        }
                    </StrictModeDroppable>
                </div>

            </DragDropContext>
        </div>
    )
}

export default NotesCardList;