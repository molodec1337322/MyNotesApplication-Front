import React, {useState} from "react";
import {Button, Form, Row} from "react-bootstrap";
import {ClipLoader} from "react-spinners";

function EditColumnWindow({columnData, setColumnData, onEditColumnHandler, setActive}){

    const [message, setMessage] = useState("")
    const [isLoading, setLoading] = useState(false)

    function editColumn(e){
        e.preventDefault()
        if(!columnData.name){
            setMessage("Поля не могут быть пустыми!")
            return
        }
        setMessage("")
        setLoading(true)

        onEditColumnHandler(columnData)

        setLoading(false)
        setActive(false)
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

    let button

    if(!isLoading){
        button = <Button className="mx-lg-2 mx-0 my-lg-0 my-2" variant="success" type="submit">Обновить</Button>
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
            <h2>Редактирование столбца</h2>
            <Form onSubmit={editColumn}>

                <br/>

                <Form.Group as={Row} className="mb-3">
                    <Form.Control name="name" type="text" placeholder="Заголовок" value={columnData.name} onChange={changeInput}/>
                </Form.Group>

                <br/>

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

export default EditColumnWindow;