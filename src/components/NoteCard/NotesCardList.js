import React, {useState} from "react";
import "./NoteCardList.css"
import NoteCard from "./NoteCard";

function NotesCardList(notes){
    console.log(notes.notes)
    return(
        <div className={"NoteCardListBackground"}>
            {notes.notes.map((note, index) => {
                return(<NoteCard id={note.id} title={note.title} body={note.body} key={note.id}/>)
            })}
        </div>
    )
}

export default NotesCardList;