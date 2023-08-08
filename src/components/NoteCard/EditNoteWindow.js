import React, {useState} from "react";
import {Button, Form, Row} from "react-bootstrap";

function EditNoteWindow({noteData, setNoteData, onEditNoteHandler, setActive}){

    const [message, setMessage] = useState("")

    function editNote(e){
        e.preventDefault()
        if(!noteData.name || !noteData.text){
            setMessage("Поля не могут быть пустыми!")
            return
        }
        setActive(false)
        onEditNoteHandler(noteData)
    }

    function changeInput(e){
        e.preventDefault()
        setNoteData(prev => {
            return{
                ...prev,
                [e.target.name]: e.target.value,
            }
        })
    }

    return(
        <div className="form">
            <h2>Редактирование задачи</h2>
            <Form onSubmit={editNote}>

                <br/>

                <Form.Group as={Row} className="mb-3">
                    <Form.Control name="name" type="text" placeholder="Заголовок" value={noteData.name} onChange={changeInput}/>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Control name="text" type="text" placeholder="Текст" as="textarea" value={noteData.text} onChange={changeInput}/>
                </Form.Group>

                <br/>

                <div className="d-flex justify-content-center">
                    <Button className="mx-lg-2 mx-0 my-lg-0 my-2" variant="success" type="submit">Обновить</Button>
                </div>
                <div className="d-flex justify-content-center">
                    <p id="showErrorMessage">{message}</p>
                </div>
            </Form>
        </div>
    )

}

export default EditNoteWindow;