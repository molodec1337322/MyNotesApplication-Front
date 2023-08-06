import React from "react";

function ShowNoteWindow({note}){

    return(
        <div>
            <h4>{note.name}</h4>
            <br/>
            <p>
                {note.text}
            </p>
        </div>
    )
}

export default ShowNoteWindow