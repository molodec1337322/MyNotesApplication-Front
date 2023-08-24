import React, {useState} from "react";
import {Button, Form, Row} from "react-bootstrap";
import {ClipLoader} from "react-spinners";

function CreateNewColumnWindow({setActive, onAddColumnHandler}){

    const [newColumn, setNewColumn] = useState(() => {
        return{
            name: "",
        }
    })
    const [message, setMessage] = useState("")
    const [isLoading, setLoading] = useState(false)

    function createNewColumn(e){
        e.preventDefault()
        if(!newColumn.name){
            setMessage("Поля не могут быть пустыми!")
            return
        }

        setMessage("")
        setLoading(true)

        onAddColumnHandler(newColumn.name)
        setLoading(false)
        setActive(false)
        setNewColumn(() => {
            return{
                name: "",
            }
        })

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
            <h2>Новый столбец</h2>
            <Form onSubmit={createNewColumn}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Control name="name" type="text" placeholder="Заголовок" value={newColumn.name} onChange={changeInput}/>
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

export default CreateNewColumnWindow;