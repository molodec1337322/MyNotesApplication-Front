import React, {useContext, useState} from 'react'
import axios from 'axios';
import validator from 'validator';
import {consts} from "../../config/consts";
import {AuthContext} from "../../context/AuthContext";
import {Button, Col, Form, FormControl, Row} from "react-bootstrap";
import {ClipLoader} from "react-spinners";

function Registration(){
    const {auth, setAuth} = useContext(AuthContext)

    const [registration, setRegistration] = useState(() => {
        return {
            username: "",
            email: "",
            password: "",
            password2: "",
        }
    })
    const [message, setMessage] = useState("")
    const [isLoading, setLoading] = useState(false)

    function changeInputRegister(e){
        e.persist()
        setRegistration(prev => {
            return{
                ...prev,
                [e.target.name]: e.target.value,
            }
        })
    }

    function sendRegistrationData(e){
        e.preventDefault()



        if(registration.email.length <= 3){
            //alert("Поле с электронной почтой не должно быть пустым")
            setMessage("Поле с электронной почтой не должно быть пустым")
        }
        else if(registration.username.length <= 3){
            //alert("Поле с именем пользователем не должно модержать менее 3 символов")
            setMessage("Поле с именем пользователем не должно модержать менее 3 символов")
        }
        else if(!validator.isEmail(registration.email)){
            //alert("Вы не ввели адрес почты")
            setMessage("Вы не ввели адрес почты")
        }
        else if(registration.password !== registration.password2){
            //alert("Repeated password incorrectly")
            setMessage("Пароли не совпадают")
        }
        /*
        else if(!validator.isStrongPassword(registration.password, {minSymbols: 2})){
            //alert("Password must consist of one lowercase, uppercase letter and number, at least 2 characters")
            setMessage("Пароль должен содержать как минимум одну заглавную букву, одну строчную и одну цифру")
        }

         */
        else{
            setLoading(true)
            axios.post(consts.API_SERVER + "/api/v1/Auth/Registration", {
                username: registration.username,
                email: registration.email,
                password: registration.password,
            }).then(res => {
                setLoading(false)
                if(res.data == true){
                    setMessage("На вашу почту было отправлено письмо для подтверждения аккаунта")
                }
            }).catch((ex) => {
                setLoading(false)
                console.log(ex)
                if(ex.response.status == 409){
                    setMessage("Имя пользователя или почта уже заняты")
                }
                else{
                    setMessage("Во время выполнения запроса произошла ошибка")
                }
            })
        }

    }

    let button

    if(!isLoading){
        button = <Button className="mx-lg-2 mx-0 my-lg-0 my-2" variant="success" type="submit">Зарегестрироваться</Button>
    }
    else{
        button = <ClipLoader
            color="#757575"
            loading={isLoading}
            size={38}
            aria-label="Loading Spinner"
        />
    }

    return (
        <div className="form">
            <h2>Регистрация</h2>
            <Form onSubmit={sendRegistrationData}>

                <br/>
                <Form.Group as={Row} className="mb-3" controlId="formRegistrationPlaintextUsername">
                    <FormControl name="username" type="username" placeholder="Имя пользователя" value={registration.username} onChange={changeInputRegister}/>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formRegistrationPlaintextEmail">
                    <FormControl name="email" type="email" placeholder="Почта (example@example.com)" value={registration.email} onChange={changeInputRegister}/>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formRegistrationPlaintextPassword">
                    <FormControl name="password" type="password" placeholder="Пароль" value={registration.password} onChange={changeInputRegister}/>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formRegistrationPlaintextPassword2">
                    <FormControl name="password2" type="password" placeholder="Повтор пароля" value={registration.password2} onChange={changeInputRegister}/>
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

export default Registration;