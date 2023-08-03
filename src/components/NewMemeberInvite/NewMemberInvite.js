import React, {useContext, useState} from "react";
import {Button, Form, FormControl, Row} from "react-bootstrap";
import axios from "axios";
import {consts} from "../../config/consts";
import {AuthContext} from "../../context/AuthContext";

function NewMemberInvite({setActive, boardId}){

    const {auth, setAuth} = useContext(AuthContext)

    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    function changeInputLogin(e){
        e.persist()
        setEmail(e.target.value)
    }

    async function sendInvitation(e){
        e.preventDefault()

        try{
            let resp = await axios.post(consts.API_SERVER + "/api/v1/Boards/AddUserAsGuest/" + boardId,
                {email: email},
                {headers: {
                        Authorization: auth.token
                    }
                })
        }
        catch (ex){
            if(ex.response.status === 400){
                setMessage("Пользователь с указанной почтой не существует")
            }
            else{
                setMessage("Во время выполнения запроса произошла ошибка")
            }
        }
    }

    return(
        <div className="form">
            <h3>Приглашение на доску</h3>
            <Form onSubmit={sendInvitation}>

                <br/>
                <Form.Group as={Row} className="mb-4" controlId="formInvitationEmail">
                    <FormControl name="email" type="email" placeholder="Почта (example@example.com)" value={email} onChange={changeInputLogin}/>
                </Form.Group>
                <br/>

                <div className="d-flex justify-content-center">
                    <Button className="mx-lg-2 mx-0 my-lg-0 my-2" variant="success" type="submit">Отправить</Button>
                </div>


                <div  className="d-flex justify-content-center">
                    <p id="showErrorMessage">{message}</p>
                </div>
            </Form>
        </div>
    )
}

export default NewMemberInvite;