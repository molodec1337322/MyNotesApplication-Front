import React, {useState} from "react";
import {Button, Form, Row} from "react-bootstrap";

function EditBoardWindow({boardId, boardName, setBoardName, onEditBoardHandler, setActive}){

    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    function editBoard(e){
        e.preventDefault()
        if(!boardName){
            setMessage("Поле не может быть пустыми!")
            return
        }
        setMessage("")
        setLoading(true)

        onEditBoardHandler(boardId, boardName, setLoading)

        setLoading(false)
        setActive(false)
    }

    function changeInput(e){
        e.preventDefault()
        setBoardName(prev => {
            return{
                ...prev,
                [e.target.name]: e.target.value,
            }
        })
    }

    return(
        <div className="form">
            <h2>Редактирование задачи</h2>
            <Form onSubmit={editBoard}>

                <br/>

                <Form.Group as={Row} className="mb-3">
                    <Form.Control name="name" type="text" placeholder="Заголовок" value={boardName} onChange={changeInput}/>
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

export default EditBoardWindow;