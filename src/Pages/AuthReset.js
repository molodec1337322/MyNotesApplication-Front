import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import MyModal from "../components/Modal/MyModal";
import {Button, Form, FormControl, Row} from "react-bootstrap";

function AuthReset(){

    let navigate = useNavigate()
    const {token} = useParams()
    const [message, setMessage] = useState()
    const [active, setActive] = useState()
    const [passwords, setPasswords] = useState(() => {
        return{
            password1: "",
            password2: ""
        }
    })

    function changeInputPasswords(e){
        e.persist()
        setPasswords(prev => {
            return{
                ...prev,
                [e.target.name]: e.target.value,
            }
        })
    }

    async function resetPassword(e){
        e.preventDefault()
        if(passwords.password1 !== passwords.password2){
            setMessage("Пароли не совпадают")
        }

        navigate("/")
    }

    return(
        <div>
            <MyModal active={true} setActive={setActive}>
                <div className="form">
                    <h2>Восстановление пароля</h2>
                    <Form onSubmit={resetPassword}>

                        <br/>
                        <Form.Group as={Row} className="mb-3" controlId="formResetPlaintextPassword1">
                            <FormControl name="password1" type="password" placeholder="Пароль" value={passwords.password1} onChange={changeInputPasswords}/>
                        </Form.Group>

                        <br/>

                        <Form.Group as={Row} className="mb-3" controlId="formResetPlaintextPassword2">
                            <FormControl name="password2" type="password" placeholder="Повторите пароль еще раз" value={passwords.password2} onChange={changeInputPasswords}/>
                        </Form.Group>

                        <div className="d-flex justify-content-center">
                            <Button className="mx-lg-2 mx-0 my-lg-0 my-2" variant="success" type="submit">Восстановить пароль</Button>
                        </div>

                        <div  className="d-flex justify-content-center">
                            <p id="showErrorMessage">{message}</p>
                        </div>
                    </Form>
                </div>
            </MyModal>
        </div>
    )
}

export default AuthReset;