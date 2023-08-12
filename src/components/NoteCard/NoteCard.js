import React, {useContext, useState} from "react";
import {Button, Card, Col, Dropdown, DropdownButton, Form, Row} from "react-bootstrap";
import "./NoteCard.css"
import {AuthContext} from "../../context/AuthContext";
import MyModal from "../Modal/MyModal";
import ShowNoteWindow from "./ShowNoteWindow";

function NoteCard({note, onDeleteNoteHandler, onShowNoteHandler, onShowEditNoteHandler}) {

    const {auth, setAuth} = useContext(AuthContext)
    const [isActive, setIsActive] = useState(false)

    function deleteNote(e){
        e.preventDefault()
        onDeleteNoteHandler(note.id, note.type)
    }

    function showNote(e){
        e.preventDefault()
        setIsActive(true)
    }

    let parametersButton

    if(auth.isBoardOwner){

        parametersButton =
            <div>
                <Dropdown id="dropdown-note-params-button">

                    <Dropdown.Toggle variant="light">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                            <path
                                d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                        </svg>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <Button onClick={() => onShowEditNoteHandler(note)} variant="outline-dark" className="container-fluid">Редактировать</Button>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Button onClick={deleteNote} className="container-fluid" variant="outline-danger">Удалить</Button>
                        </Dropdown.Item>
                    </Dropdown.Menu>

                </Dropdown>
            </div>
    }

    return(
        <Card className="NoteCard border-0 md-3">
            <Card.Body>
                <Row>
                    <Col md="8">
                        <Card.Title onClick={() => onShowNoteHandler(note)}>{note.name}</Card.Title>
                    </Col>
                    <Col md="4">
                        {parametersButton}
                    </Col>
                </Row>
            </Card.Body>
        </Card>

    )
}

export default NoteCard;