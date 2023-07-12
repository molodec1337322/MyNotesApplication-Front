import React, {useState} from "react";
import {Button, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";

function CreateNewNoteWindow(notesList, active, {onAddNoteHandler}){

    console.log(onAddNoteHandler)
    let myNotesList = notesList

    const [isActive, setIsActive] = useState(active)
    const [notes, setNotes] = useState(notesList.notesList.notes)
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
        onAddNoteHandler(newNote.title, newNote.text)
        /*
        let newNoteObj = {
            id: notes.length,
            title: newNote.title,
            body: newNote.text,
            type: NOTES_TYPE_CREATE,
            order: Array.from(myNotesList.notesList.notes).filter(note => {return note.type === NOTES_TYPE_CREATE}).length,
        }
        myNotesList.notesList.notes = Array.from(myNotesList.notesList.notes).push(newNoteObj)

         */
        /*
        setNotes(prev => {
            let newNoteObj = {
                id: notes.length,
                title: newNote.title,
                body: newNote.text,
                type: NOTES_TYPE_CREATE,
                order: Array.from(myNotesList.notesList.notes).filter(note => {return note.type === NOTES_TYPE_CREATE}).length,
            }
            return Array.from(myNotesList.notesList.notes).push(newNoteObj)
        })

         */
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