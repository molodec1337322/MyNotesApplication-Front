import React, {useContext, useState} from "react";
import {Button, Card} from "react-bootstrap";
import "./NoteCard.css"
import {AuthContext} from "../../context/AuthContext";

function NoteCard({note, onDeleteNoteHandler}) {

    const {auth, setAuth} = useContext(AuthContext)

    const [cardData, setCardData] = useState(() => {
        return{
            id: note.id,
            title: note.title,
            text: note.text,
            type: note.type
        }
    })

    function deleteNote(e){
        e.preventDefault()
        onDeleteNoteHandler(note.id, note.type)
    }

    let delBtn

    if(auth.isBoardOwner){
        delBtn =
            <div className="d-flex justify-content-end">
                <Button className="mx-lg-2 mx-0 my-lg-0 my-2" variant="outline-danger" onClick={e => deleteNote(e)}>Удалить</Button>
            </div>
    }

    return(
        <Card className="NoteCard border-0 md-3">
            <Card.Body>
                <Card.Title>{cardData.title}</Card.Title>
                <Card.Text>
                    {cardData.text}
                </Card.Text>
                {delBtn}
            </Card.Body>
        </Card>
    )
}

export default NoteCard;