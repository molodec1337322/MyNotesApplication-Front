import React, {useContext, useState} from "react";
import {Button, Form, Row} from "react-bootstrap";
import axios from "axios";
import {consts} from "../../config/consts";
import {AuthContext} from "../../context/AuthContext";


function MySidebarAddNewBoardWindow({setOwnedBoards}){

    const {auth, setAuth} = useContext(AuthContext)

    const [newBoard, setNewBoard] = useState(() => {
        return{
            name: "",
        }
    })

    const [message, setMessage] = useState("")

    async function createNewBoard(e){
        e.preventDefault()
        if(!newBoard.name){
            setMessage("Поля не могут быть пустыми!")
            return
        }

        let resp= await axios.post(consts.API_SERVER + "/api/v1/Boards/Create",
            newBoard,
            {headers: {
                    Authorization: auth.token
                }
            })

        setOwnedBoards(prev => {
            return[
                ...prev,
                resp.data
            ]
        })
    }

    function changeInput(e){
        e.preventDefault()
        setNewBoard(prev => {
            return{
                ...prev,
                [e.target.name]: e.target.value,
            }
        })
    }

    return(
        <div className="form">
            <h2>Новый столбец</h2>
            <Form onSubmit={createNewBoard}>

                <br/>

                <Form.Group as={Row} className="mb-3">
                    <Form.Control name="name" type="text" placeholder="Заголовок" value={newBoard.name} onChange={changeInput}/>
                </Form.Group>

                <br/>

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

export default MySidebarAddNewBoardWindow;