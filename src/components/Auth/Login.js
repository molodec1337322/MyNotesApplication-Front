import React, {useContext, useState} from 'react'
import axios from 'axios';
import validator from 'validator';
import { DOMEN_SERVER, DOMEN_SITE } from '../../config/const';
import {AuthContext} from "../../context";

function Login(){
    const {auth, setAuth} = useContext(AuthContext)

    const [login, setLogin] = useState(() => {
        return {
            username: "",
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

    function sendLoginData(e){
        e.preventDefault()
        if(login.username.length < 1){
            //alert("You did not enter username")
            setMessage("Вы не ввели имя пользователя")
        }
        else{
            axios.post(DOMEN_SERVER + "api/Auth/Login", {
                username: login.username,
                password: login.password,
            }).then(res => {
                if(res.data == true){
                    //alert(res.data)
                    setAuth(prev => {
                        return{
                            ...prev,
                            token: res.token,
                            username: " ",
                            isAuth: true
                        }
                    })
                }
                else if(res.status == 404){
                    //alert("An error occurred on the server")
                    setMessage("Имя пользователя или пароль введены неверно")
                }
            }).catch(() => {
                //alert("An error occurred on the server")
                setMessage("Во время выполнения запроса произошла ошибка")
            })
        }
    }

    return (
        <div className="form">
            <h2>Вход</h2>
            <form onSubmit={sendLoginData}>
                <p>Имя пользователя: <input
                    type="username"
                    id="username"
                    name="username"
                    value={login.username}
                    onChange={changeInputLogin}
                /></p>
                <p>Пароль: <input
                    type="password"
                    id="password"
                    name="password"
                    value={login.password}
                    onChange={changeInputLogin}
                /></p>
                <input type="submit"/>
                <p id="showErrorMessage">{message}</p>
            </form>
        </div>
    )
}

export default Login;