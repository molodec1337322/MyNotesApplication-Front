import React, {useContext, useState} from 'react'
import axios from 'axios';
import validator from 'validator';
import { DOMEN_SERVER, DOMEN_SITE } from '../../config/const';
import {AuthContext} from "../../context";

function Registration(){
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const [registration, setRegistration] = useState(() => {
        return {
            username: "",
            email: "",
            password: "",
            password2: "",
        }
    })

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
            alert("Поле с электронной почтой не должно быть пустым")
        }
        else if(registration.username.length <= 3){
            alert("Поле с именем пользователем не должно модержать менее 3 символов")
        }
        else if(!validator.isEmail(registration.email)){
            alert("Вы не ввели адрес почты")
        }
        else if(registration.password !== registration.password2){
            alert("Repeated password incorrectly")
        }
        else if(!validator.isStrongPassword(registration.password, {minSymbols: 2})){
            alert("Password must consist of one lowercase, uppercase letter and number, at least 2 characters")
        }
        else{
            axios.post(DOMEN_SERVER + "api/Auth/Registration", {
                username: registration.username,
                email: registration.email,
                password: registration.password,
            }).then(res => {
                if(res.data == true){
                    alert("Please, check your email for confirmation mail to validate your account")
                }
                else if(res.status == 409){
                    alert("Email or username already in use")
                }
            }).catch(() => {
                alert("An error occurred on the server")
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
                    value={Registration.usernamr}
                    onChange={changeInputRegister}
                /></p>
                <p>Электронная почта: <input
                    type="email"
                    id="email"
                    name="email"
                    value={Registration.email}
                    onChange={changeInputRegister}
                    formnovalidate
                /></p>
                <p>Пароль: <input
                    type="password"
                    id="password"
                    name="password"
                    value={Registration.password}
                    onChange={changeInputRegister}
                /></p>
                <p>Подтвердите пароль: <input
                    type="password"
                    id="password2"
                    name="password2"
                    value={Registration.password2}
                    onChange={changeInputRegister}
                /></p>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default Registration;