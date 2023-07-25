import React, {useState} from "react";
import {Button, Form, Row} from "react-bootstrap";

function CreateNewColumnWindow({setActive, onAddColumnHandler}){

    const [newColumn, setNewColumn] = useState(() => {
        return{
            name: "",
        }
    })
    const [message, setMessage] = useState("")

    function createNewColumn(e){
        e.preventDefault()
        if(!newColumn.name){
            setMessage("Поля не могут быть пустыми!")
            return
        }
        setActive(false)
        onAddColumnHandler(newColumn.name)
    }

    function changeInput(e){
        e.preventDefault()
        setNewColumn(prev => {
            return{
                ...prev,
                [e.target.name]: e.target.value,
            }
        })
    }

    return(
        <div className="form">
            <h2>Новый столбец</h2>
            <Form onSubmit={createNewColumn}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Control name="name" type="text" placeholder="Заголовок" value={newColumn.name} onChange={changeInput}/>
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

export default CreateNewColumnWindow;