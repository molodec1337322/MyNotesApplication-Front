import React, {useState} from "react";
import {Button, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";

function CreateNewNoteWindow(notesList){
    const [notes, setNotes] = useState(notesList)
    const [newNote, setNewNote] = useState(() => {
        return{
            title: "",
            text: ""
        }
    })
    const [message, setMessage] = useState("")

    function createNewNote(e){
        e.preventDefault()
    }

    function changeInput(e){
        e.preventDefault()
        setNewNote(prev => {
            return{
                ...prev,
                [e.target.name]: e.target.value,
            }
        })
    }

    return(
        <div className="form">
            <h2>Новая заметка</h2>
            <Form onSubmit={createNewNote}>
                <Row className="align-items-center">
                    <Form.Control name="title" type="text" placeholder="Заголовок" value={newNote.title} onChange={changeInput}/>
                </Row>
                <br />
                <Row>
                    <Form.Control placeholder="Текст" name="text" as="textarea" value={newNote.text} onChange={changeInput} aria-label="With textarea" />
                </Row>

                <div  className="d-flex justify-content-center">
                    <p id="showErrorMessage">{message}</p>
                </div>
                <div className="d-flex justify-content-center">
                    <Button className="mx-lg-2 mx-0 my-lg-0 my-2" variant="success" type="submit">Добавить</Button>
                </div>
            </Form>
        </div>
    )
}

export default CreateNewNoteWindow;