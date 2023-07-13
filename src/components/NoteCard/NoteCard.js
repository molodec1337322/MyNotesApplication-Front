import React, {useState} from "react";
import {Button, Card, Form} from "react-bootstrap";
import "./NoteCard.css"

function NoteCard({note, onDeleteNoteHandler}) {

    const [cardData, setCardData] = useState(() => {
        return{
            id: note.id,
            title: note.title,
            body: note.body,
            type: note.type
        }
    })



    function deleteNote(e){
        e.preventDefault()
        onDeleteNoteHandler(note.id, note.type)
    }

    return(
        <Card className="NoteCard border-0 md-3">
            <Card.Body>
                <Card.Title>{cardData.title}</Card.Title>
                <Card.Text>
                    {cardData.body}
                </Card.Text>
                <div className="d-flex justify-content-end">
                    <Button className="mx-lg-2 mx-0 my-lg-0 my-2" variant="outline-danger" onClick={e => deleteNote(e)}>Удалить</Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default NoteCard;