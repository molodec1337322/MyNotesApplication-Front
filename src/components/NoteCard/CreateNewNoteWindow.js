import React, {useState} from "react";
import {Button, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";

function CreateNewNoteWindow(notesList, active){

    console.log(notesList)

    const [isActive, setIsActive] = useState(active)
    const [notes, setNotes] = useState(notesList)
    const [newNote, setNewNote] = useState(() => {
        return{
            title: "",
            text: ""
        }
    })
    const [message, setMessage] = useState("")

    const NOTES_TYPE_CREATE = "ToDo"

    function createNewNote(e){
        e.preventDefault()
        if(!newNote.title || !newNote.text){
            setMessage("Поля не могут быть пустыми!")
            return
        }
        setIsActive(false)
        setNotes(prev => {
            let newNoteObj = {
                id: notes.SIZE,
                title: newNote.title,
                body: newNote.text,
                type: NOTES_TYPE_CREATE,
                order: notesList.filter(note => {return note.type === NOTES_TYPE_CREATE}),
            }
            return{
                ...prev,
                newNoteObj,
            }
        })
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
                <Form.Group as={Row} className="mb-3">
                    <Form.Control name="title" type="text" placeholder="Заголовок" value={newNote.title} onChange={changeInput}/>
                </Form.Group>
                <br />
                <Form.Group as={Row} className="mb-3">
                    <Form.Control placeholder="Текст" name="text" as="textarea" value={newNote.text} onChange={changeInput} aria-label="With textarea" />
                </Form.Group>

                <div className="d-flex justify-content-center">
                    <Button className="mx-lg-2 mx-0 my-lg-0 my-2" variant="success" type="submit">Добавить</Button>
                </div>
                <div className="d-flex justify-content-center">
                    <p id="showErrorMessage">{message}</p>
                </div>
            </Form>
        </div>
    )
}

export default CreateNewNoteWindow;