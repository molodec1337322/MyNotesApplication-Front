import React, {useContext, useState} from 'react'
import {consts} from "../../config/consts";
import {AuthContext} from "../../context/AuthContext";
import {Button, Col, Form, FormControl, Row} from "react-bootstrap";
import jwt_decode from "jwt-decode";
import axios from "axios";

function Login({setActive, onAuth}){
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
        let decodedJWT = jwt_decode(jwt.split(' ')[1])
        console.log(decodedJWT)
        return decodedJWT
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
            axios.post(consts.API_SERVER + "/api/v1/Auth/Login", {
                Email: login.email,
                Password: login.password,
            }, {headers: {
                "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                    "Access-Control-Allow-Origin": "*",
                }
            }).then(res => {
                if(typeof res.data !== "undefined"){
                    setAuth(prev => {
                        return{
                            ...prev,
                            token: res.data.token,
                            username: getUsernameFromJWT(res.data.token),
                            isAuth: true
                        }
                    })
                    onAuth(res.data.token)
                    setActive(false)
                }
            }).catch(e => {
                if(typeof e.response !== "undefined"){
                    if(e.response.status === 404){
                        setMessage("Почта или пароль введены неверно")
                    }
                }
                else{
                    console.log(e)
                    setMessage("Во время выполнения запроса произошла ошибка")
                }
            })
        }
    }

    return (
        <div className="form">
            <h2>Вход</h2>
            <Form onSubmit={sendLoginData}>

                <br/>
                <Form.Group as={Row} className="mb-4" controlId="formPlaintextEmail">
                    <FormControl name="email" type="email" placeholder="Почта (example@example.com)" value={login.email} onChange={changeInputLogin}/>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <FormControl name="password" type="password" placeholder="Пароль" value={login.password} onChange={changeInputLogin}/>
                </Form.Group>

                <br/>

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