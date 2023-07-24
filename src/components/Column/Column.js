import React from "react";
import {Draggable} from "react-beautiful-dnd";
import NoteCard from "../NoteCard/NoteCard";
import StrictModeDroppable from "../DroppableStrictModeForBDnD/DroppableStrictModeForBDnD";

function Column({notes, col, handleOnDeleteNote, addCardBtn}){

    return(
        <div className="d-inline-block NotesCards">
            <h4>{col.name}</h4>
            <StrictModeDroppable droppableId={col.id} className="col-md-3">
                {(provided) => (
                    <div className="TaskColumn" {...provided.droppableProps} ref={provided.innerRef}>
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
                        {addCardBtn}
                    </div>
                )
                }
            </StrictModeDroppable>
        </div>
    );
}

export default Column;