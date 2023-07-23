import React from "react";
import {Draggable} from "react-beautiful-dnd";
import NoteCard from "../NoteCard/NoteCard";
import StrictModeDroppable from "../DroppableStrictModeForBDnD/DroppableStrictModeForBDnD";

function Column({notes, droppableId, handleOnDeleteNote}){

    return(
        <StrictModeDroppable droppableId={droppableId.toString()} className="col-md-3">
            {(provided) => (
                <div className="ToDo" {...provided.droppableProps} ref={provided.innerRef}>
                    {notes?.map((note, index) => {
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
                </div>
            )
            }
        </StrictModeDroppable>
    );
}

export default Column;