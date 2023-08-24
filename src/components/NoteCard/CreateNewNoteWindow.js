import React, {useState} from "react";
import {Button, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import {ClipLoader} from "react-spinners";

function CreateNewNoteWindow({setActive, onAddNoteHandler, columnId, boardId}){

    const [newNote, setNewNote] = useState(() => {
        return{
            title: "",
            text: ""
        }
    })
    const [message, setMessage] = useState("")
    const [isLoading, setLoading] = useState(false)

    function createNewNote(e){
        e.preventDefault()
        if(!newNote.title || !newNote.text){
            setMessage("Поля не могут быть пустыми!")
            return
        }

        setMessage("")
        setLoading(true)

        onAddNoteHandler(newNote.title, newNote.text, columnId.toString(), boardId.toString())

        setLoading(false)
        setActive(false)
        setNewNote(() => {
            return{
                title: "",
                text: ""
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

    let button

    if(!isLoading){
        button = <Button className="mx-lg-2 mx-0 my-lg-0 my-2" variant="success" type="submit">Добавить</Button>
    }
    else{
        button = <ClipLoader
            color="#757575"
            loading={isLoading}
            size={38}
            aria-label="Loading Spinner"
        />
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
                    {button}
                </div>
                <div className="d-flex justify-content-center">
                    <p id="showErrorMessage">{message}</p>
                </div>
            </Form>
        </div>
    )
}

export default CreateNewNoteWindow;