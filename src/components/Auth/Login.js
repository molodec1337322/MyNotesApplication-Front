import React, {useContext, useState} from 'react'
import axios from 'axios';
import {consts} from "../../config/consts";
import {AuthContext} from "../../context";
import {Button, Col, Form, FormControl, Row} from "react-bootstrap";

function Login(active){
    const {auth, setAuth} = useContext(AuthContext)

    const [login, setLogin] = useState(() => {
        return {
            email: "",
            password: "",
        }
    })
    const [message, setMessage] = useState("")

    function changeInputLogin(e){
        e.persist()
        setLogin(prev => {
            return{
                ...prev,
                [e.target.name]: e.target.value,
            }
        })
    }

    function getUsernameFromJWT(jwt){
        return jwt.length
    }

    function sendLoginData(e){
        e.preventDefault()
        if(login.email.length < 1){
            //alert("You did not enter username")
            setMessage("Вы не ввели почту")
        }
        else if(login.password.length < 1){
            setMessage("Вы не ввели пароль")
        }
        else{
            console.log(consts.API_SERVER)
            axios.post(consts.API_SERVER + "/api/Auth/Login", {
                mode: 'no-cors',
                body:{
                    email: login.email,
                    password: login.password,
                },
            }).then(res => {
                if(res.data == true){
                    //alert(res.data)
                    setAuth(prev => {
                        return{
                            ...prev,
                            token: res.token,
                            username: getUsernameFromJWT(res.token),
                            isAuth: true
                        }
                    })
                }
                else if(res.status == 404){
                    //alert("An error occurred on the server")
                    setMessage("Имя пользователя или пароль введены неверно")
                }
            }).catch(e => {
                //alert("An error occurred on the server")
                console.log(e)
                setMessage("Во время выполнения запроса произошла ошибка")
            })
        }
    }

    return (
        <div className="form">
            <h2>Вход</h2>
            <Form onSubmit={sendLoginData}>
                <Form.Group as={Row} className="mb-4" controlId="formPlaintextEmail">
                    <Form.Label column sm="4">
                        Эелектронная почта
                    </Form.Label>
                    <Col sm="8">
                        <FormControl name="email" type="email" placeholder="example@example.com" value={login.email} onChange={changeInputLogin}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        Пароль
                    </Form.Label>
                    <Col sm="8">
                        <FormControl name="password" type="password" placeholder="****" value={login.password} onChange={changeInputLogin}/>
                    </Col>
                </Form.Group>

                <div className="d-flex justify-content-center">
                    <Button className="mx-lg-2 mx-0 my-lg-0 my-2" variant="success" type="submit">Войти</Button>
                </div>

                <div  className="d-flex justify-content-center">
                    <p id="showErrorMessage">{message}</p>
                </div>
            </Form>
        </div>
    )
}

export default Login;