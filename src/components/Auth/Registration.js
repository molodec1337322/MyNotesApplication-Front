import React, {useContext, useState} from 'react'
import axios from 'axios';
import validator from 'validator';
import { DOMEN_SERVER, DOMEN_SITE } from '../../config/const';
import {AuthContext} from "../../context";

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

    function changeInputRegister(e){
        e.persist()
        setRegistration(prev => {
            return{
                ...prev,
                [e.target.name]: e.target.value,
            }
        })
    }

    function showServerResponse(){

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
        else if(!validator.isStrongPassword(registration.password, {minSymbols: 2})){
            //alert("Password must consist of one lowercase, uppercase letter and number, at least 2 characters")
            setMessage("Пароль должен содержать как минимум одну заглавную букву, одну строчную и одну цифру")
        }
        else{
            axios.post(DOMEN_SERVER + "api/Auth/Registration", {
                username: registration.username,
                email: registration.email,
                password: registration.password,
            }).then(res => {
                if(res.data == true){
                    //alert("Please, check your email for confirmation mail to validate your account")
                    setMessage("На вашу почту было отправлено письмо для подтверждения аккаунта")
                }
                else if(res.status == 409){
                    //alert("Email or username already in use")
                    setMessage("Имя пользователя или почта уже заняты")
                }
            }).catch(() => {
                //alert("An error occurred on the server")
                setMessage("Во время выполнения запроса произошла ошибка")
            })
        }
    }

    return (
        <div className="form">
            <h2>Регистрация:</h2>
            <form onSubmit={sendRegistrationData}>
                <p>Имя пользователя: <input
                    type="username"
                    id="username"
                    name="username"
                    value={registration.usernamr}
                    onChange={changeInputRegister}
                /></p>
                <p>Электронная почта: <input
                    type="email"
                    id="email"
                    name="email"
                    value={registration.email}
                    onChange={changeInputRegister}
                    formnovalidate
                /></p>
                <p>Пароль: <input
                    type="password"
                    id="password"
                    name="password"
                    value={registration.password}
                    onChange={changeInputRegister}
                /></p>
                <p>Подтвердите пароль: <input
                    type="password"
                    id="password2"
                    name="password2"
                    value={registration.password2}
                    onChange={changeInputRegister}
                /></p>
                <input type="submit"/>
                <p id="showErrorMessage">{message}</p>
            </form>
        </div>
    )
}

export default Registration;