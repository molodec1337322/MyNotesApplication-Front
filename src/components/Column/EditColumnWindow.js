import React, {useState} from "react";
import {Button, Form, Row} from "react-bootstrap";

function EditColumnWindow({columnData, setColumnData, onEditColumnHandler, setActive}){

    const [message, setMessage] = useState("")

    function editColumn(e){
        e.preventDefault()
        if(!columnData.name){
            setMessage("Поля не могут быть пустыми!")
            return
        }
        setActive(false)
        onEditColumnHandler(columnData)
    }

    function changeInput(e){
        e.preventDefault()
        setColumnData(prev => {
            return{
                ...prev,
                [e.target.name]: e.target.value,
            }
        })
    }

    return(
        <div className="form">
            <h2>Редактирование столбца</h2>
            <Form onSubmit={editColumn}>

                <br/>

                <Form.Group as={Row} className="mb-3">
                    <Form.Control name="name" type="text" placeholder="Заголовок" value={columnData.name} onChange={changeInput}/>
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

export default EditColumnWindow;