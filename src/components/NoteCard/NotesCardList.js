import React, {useState} from "react";
import "./NoteCardList.css"
import NoteCard from "./NoteCard";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import StrictModeDroppable from "../DroppableStrictModeForBDnD/DroppableStrictModeForBDnD";

class Triple{
    constructor(first, second, third) {
        this.first = first
        this.second = second
        this.third = third
    }

    getFirst(){
        return this.first
    }
}

function NotesCardList(notesList){

    const [notes, setNotes] = useState(notesList.notes)

    const [toDoNotes, setToDoNotes] = useState(notesList.notes.filter(note => {
        return note.type === "ToDo"
    }).sort((a, b) => parseFloat(a.order) - parseFloat(b.order)))
    const [gotInWorkNotes, setGotInWorkNotes] = useState(notesList.notes.filter(note => {
        return note.type === "GotInWork"
    }).sort((a, b) => parseFloat(a.order) - parseFloat(b.order)))
    const [inProgressNotes, setInProgressNotes] = useState(notesList.notes.filter(note => {
        return note.type === "InProgress"
    }).sort((a, b) => parseFloat(a.order) - parseFloat(b.order)))
    const [doneNotes, setDoneNotes] = useState(notesList.notes.filter(note => {
        return note.type === "Done"
    }).sort((a, b) => parseFloat(a.order) - parseFloat(b.order)))

    let map = new Map()
    map.set("ToDo", toDoNotes)
    map.set("GotInWork", gotInWorkNotes)
    map.set("InProgress", inProgressNotes)
    map.set("Done", doneNotes)

    function handleOnDragEnd(result){

        if(!result.destination){
            return;
        }

        const sourceItems = Array.from(map.get(result.source.droppableId))
        const [reorderedItem] = sourceItems.splice(result.source.index, 1)
        const destItems = Array.from(map.get(result.destination.droppableId))
        destItems.splice(result.destination.index, 0, [reorderedItem])

        /*
        if(result.destination.droppableId == result.source.droppableId){
            const items = Array.from(notes)
            const [reorderedItem] = items.splice(result.source.index, 1)
            items.splice(result.destination.index, 0, reorderedItem)
            setNotes(items)
        }

         */


        console.log(result.source.droppableId)
        console.log(result.source.index)
        console.log(result.source.id)
        console.log(result.destination.index)
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
                                    return(
                                        <Draggable key={note.id} draggableId={note.id.toString()} index={parseInt(note.order)}>
                                            {(provided) => (
                                                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                    <NoteCard id={note.id} title={note.title} body={note.body} key={note.id}/>
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
                    <h4>Взято в работу</h4>
                    <StrictModeDroppable droppableId="GotInWork" className="col-md-3">
                        {(provided) => (
                            <div className="GotInWork" {...provided.droppableProps} ref={provided.innerRef}>
                                {gotInWorkNotes?.map((note, index) => {
                                    return(
                                        <Draggable key={note.id} draggableId={note.id.toString()} index={parseInt(note.order)}>
                                            {(provided) => (
                                                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                    <NoteCard id={note.id} title={note.title} body={note.body} key={note.id}/>
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
                                    return(
                                        <Draggable key={note.id} draggableId={note.id.toString()} index={parseInt(note.order)}>
                                            {(provided) => (
                                                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                    <NoteCard id={note.id} title={note.title} body={note.body} key={note.id}/>
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
                                    return(
                                        <Draggable key={note.id} draggableId={note.id.toString()} index={parseInt(note.order)}>
                                            {(provided) => (
                                                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                    <NoteCard id={note.id} title={note.title} body={note.body} key={note.id}/>
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