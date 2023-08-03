import React, {useState} from "react";
import {Button, Form, FormControl, Row} from "react-bootstrap";

function NewMemberInvite({setActive, currentBoardId}){

    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    function changeInputLogin(e){
        e.persist()
        setEmail(prev => {
            return{
                ...prev,
                [e.target.name]: e.target.value,
            }
        })
    }

    async function sendInvitation(){

    }

    return(
        <div className="form">
            <h3>Приглашение на доску</h3>
            <Form onSubmit={sendInvitation}>
                <Form.Group as={Row} className="mb-4" controlId="formPlaintextEmail">
                    <FormControl name="email" type="memberEmail" placeholder="Почта (example@example.com)" value={email} onChange={changeInputLogin}/>
                </Form.Group>

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