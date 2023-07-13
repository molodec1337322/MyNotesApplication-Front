import React, {useState} from 'react'
import MyButton from "./components/MyButton/MyButton";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./Pages/Home"
import About from "./Pages/About"
import {AuthContext} from "./context";
import axios from "axios";
import {consts} from "./config/consts";

function App() {

    const [auth, setAuth] = useState(() => {
        return{
            token: null,
            username: null,
            isAuth: false,
            notesLimit: 0
        }
    })

    axios.get(consts.API_SERVER + "/api/v1/Notes/GetLimit",
        {},
        {headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                "Access-Control-Allow-Origin": "*",
            }
        }).then(res => {
            setAuth(prev => {
                return{
                    ...prev,
                    notesLimit: res.data.limit
                }
            })
    }).catch(e => {
        console.log(e)
        setAuth(prev => {
            return{
                ...prev,
                notesLimit: e.response.data.limit
            }
        })
    })

    return (
        <AuthContext.Provider value = {{
            auth,
            setAuth
            }
        }>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
