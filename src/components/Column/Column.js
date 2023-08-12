import React, {useContext} from "react";
import {Draggable} from "react-beautiful-dnd";
import NoteCard from "../NoteCard/NoteCard";
import StrictModeDroppable from "../DroppableStrictModeForBDnD/DroppableStrictModeForBDnD";
import "./Column.css"
import {Alert, Button, Col, Dropdown, Row} from "react-bootstrap";
import CreateNewNoteCardButton from "../NoteCard/CreateNewNoteCardButton";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import {consts} from "../../config/consts";

function Column({notes, col, boardId, handleOnDeleteNote, handleOnAddNote, onShowNoteHandler, onShowEditNoteHandler, onDeleteColumnHandler, onShowEditColumnHandler}){

    const {auth, setAuth} = useContext(AuthContext)

    let addCardBtn
    let parametersBtn

    if(auth.isBoardOwner){

        parametersBtn =
            <div>
                <Dropdown id="dropdown-column-params-button">

                    <Dropdown.Toggle variant="light">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                            <path
                                d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                        </svg>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <Button variant="outline-dark" onClick={() => onShowEditColumnHandler(col)} className="container-fluid">Редактировать</Button>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Button className="container-fluid" onClick={() => onDeleteColumnHandler(col.id)} variant="outline-danger">Удалить</Button>
                        </Dropdown.Item>
                    </Dropdown.Menu>

                </Dropdown>
            </div>

        if(notes.length >= 50){
            addCardBtn =
                <Alert variant="warning">
                    <Alert.Heading>Ой-ой!</Alert.Heading>
                    <p>
                        Кажется вы достигли лимита по созданию задач. Если вы хотите создать новые, то вам придется удалить старие. Такие дела ¯\_(ツ)_/¯
                    </p>
                </Alert>


        }
        else {
            addCardBtn =
                <div className="d-flex justify-content-center">
                    <CreateNewNoteCardButton onAddNoteHandler={handleOnAddNote} columnId={col.id} boardId={boardId}/>
                </div>
        }
    }

    return(
        <div className="d-inline-block Columns">
            <Row>
                <Col md="8" sm="6">
                    <h5>{col.name}</h5>
                </Col>
                <Col md="4" sm="6">
                    {parametersBtn}
                </Col>
            </Row>
            <StrictModeDroppable droppableId={col.id.toString()} className="col-md-3">
                {(provided) => (
                    <div className="TaskColumn" {...provided.droppableProps} ref={provided.innerRef}>
                        {notes.filter(note => {
                            return note.columnId.toString() === col.id.toString()
                        })?.map((note, index) => {
                            note.orderPlace = index

                            return(
                                <Draggable key={note.id} draggableId={note.id.toString()} index={note.orderPlace}>
                                    {(provided) => (
                                        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                            <NoteCard note={note} onDeleteNoteHandler={handleOnDeleteNote}
                                                      onShowNoteHandler={onShowNoteHandler} onShowEditNoteHandler={onShowEditNoteHandler}/>
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