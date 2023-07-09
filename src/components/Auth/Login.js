import React, {useContext, useState} from 'react'
import axios from 'axios';
import validator from 'validator';
import { DOMEN_SERVER, DOMEN_SITE } from '../../config/const';
import {AuthContext} from "../../context";

function Login(){
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const [login, setLogin] = useState(() => {
        return {
            username: "",
            password: "",
        }
    })

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
        if(!validator.username(login.username)){
            alert("You did not enter username")
        }
        else{
            axios.post(DOMEN_SERVER + "api/Auth/Login", {
                username: login.username,
                password: login.password,
            }).then(res => {
                if(res.data == true){
                    alert(res.data)
                    setIsAuth(true)
                }
                else if(res.status == 409){
                    alert("An error occurred on the server")
                }
            }).catch(() => {
                alert("An error occurred on the server")
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
                    value={Login.username}
                    onChange={changeInputLogin}
                /></p>
                <p>Пароль: <input
                    type="password"
                    id="password"
                    name="password"
                    value={Login.password}
                    onChange={changeInputLogin}
                /></p>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default Login;