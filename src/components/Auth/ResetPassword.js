import React, {useState} from "react";
import {Button, Form, FormControl, Row} from "react-bootstrap";
import axios from "axios";
import {consts} from "../../config/consts";

function ResetPassword({setActive}){

    const [email, setEmail] = useState(() => {
            return{
                email: ""
            }
        }
    )
    const [message, setMessage] = useState("")

    function changeInput(e){
        e.persist()
        setEmail(prev => {
            return{
                ...prev,
                [e.target.name]: e.target.value,
            }
        })
    }

    async function sendPasswordChangeMail(e){
        e.preventDefault()

        let resp = await axios.post(consts.API_SERVER + "/api/v1/Auth/ResetPassword",
            {
                email: email.email
            })
    }

    return (
        <div className="form">
            <h2>Смена пароля</h2>
            <Form onSubmit={sendPasswordChangeMail}>

                <br/>
                <Form.Group as={Row} className="mb-4" controlId="formPlaintextEmail">
                    <label>Введите в указанное поле email аккаунта  для которого необходимо восстановить пароль:</label>

                    <br/>

                    <FormControl name="email" type="email" placeholder="Почта (example@example.com)" value={email.email} onChange={changeInput}/>
                </Form.Group>

                <br/>

                <div className="d-flex justify-content-center">
                    <Button className="mx-lg-2 mx-0 my-lg-0 my-2" variant="success" type="submit">Сменить пароль</Button>
                </div>

                <div  className="d-flex justify-content-center">
                    <p id="showErrorMessage">{message}</p>
                </div>
            </Form>
        </div>
    )
}

export default ResetPassword;