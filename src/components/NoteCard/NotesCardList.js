import React, {useState} from "react";
import "./NoteCardList.css"
import NoteCard from "./NoteCard";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import StrictModeDroppable from "../DroppableStrictModeForBDnD/DroppableStrictModeForBDnD";

function NotesCardList(notesList){

    const [notes, setNotes] = useState(notesList.notes)

    function handleOnDragEnd(result){
        const items = Array.from(notes)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)

        setNotes(items)
    }

    return(
        <div className="NoteCardListBackground container-fluid row">
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <div>To Do List</div>
                <StrictModeDroppable droppableId="ToDoNotes" className="col-md-3">
                    {(provided) => (
                        <div className="ToDoNotes" {...provided.droppableProps} ref={provided.innerRef}>
                            {notes.map((note, index) => {
                                return(
                                    <Draggable key={note.id} draggableId={note.id.toString()} index={index}>
                                        {(provided) => (
                                            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                <NoteCard id={note.id} title={note.title} body={note.body} key={note.id}/>
                                            </div>
                                            )
                                        }
                                    </Draggable>
                                )
                            })}
                        </div>
                    )
                    }
                </StrictModeDroppable>
            </DragDropContext>
        </div>
    )
}

export default NotesCardList;