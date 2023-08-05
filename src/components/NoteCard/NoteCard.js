import React, {useContext, useState} from "react";
import {Button, Card, DropdownButton} from "react-bootstrap";
import "./NoteCard.css"
import {AuthContext} from "../../context/AuthContext";

function NoteCard({note, onDeleteNoteHandler}) {

    const {auth, setAuth} = useContext(AuthContext)

    const [cardData, setCardData] = useState(() => {
        return{
            id: note.id,
            name: note.name,
            text: note.text,
            type: note.type
        }
    })

    function deleteNote(e){
        e.preventDefault()
        onDeleteNoteHandler(note.id, note.type)
    }

    let delBtn
    let parametersButton

    if(auth.isBoardOwner){
        delBtn =
            <div className="d-flex justify-content-end">
                <Button className="mx-lg-2 mx-0 my-lg-0 my-2 " variant="bg-transparent-danger" onClick={e => deleteNote(e)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                         className="bi bi-trash" viewBox="0 0 16 16">
                        <path
                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                        <path
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                    </svg>
                </Button>
            </div>

        parametersButton =
            <div>
                <DropdownButton variant="bg-transparent-danger" className="pull-right mx-lg-2 mx-0 my-lg-0 my-2" id="dropdown-note-params-button" title={
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-three-dots" viewBox="0 0 16 16">
                        <path
                            d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                    </svg>}>

                </DropdownButton>
            </div>
    }

    return(
        <Card className="NoteCard border-0 md-3">
            <Card.Body>
                <div className="container-fluid d-flex">
                    <Card.Title>{cardData.name}</Card.Title>
                    {parametersButton}
                </div>
                <Card.Text>
                    {cardData.text}
                </Card.Text>
                {delBtn}
            </Card.Body>
        </Card>
    )
}

export default NoteCard;