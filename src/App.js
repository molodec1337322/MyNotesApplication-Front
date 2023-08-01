import React, {useState} from 'react'
import MyButton from "./components/MyButton/MyButton";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./Pages/Home"
import About from "./Pages/About"
import {AuthContext} from "./context/AuthContext";
import axios from "axios";
import {consts} from "./config/consts";

function App() {

    const [auth, setAuth] = useState(async () => {

        let notesLimit

        try{
            let resp = await axios.get(consts.API_SERVER + "/api/v1/Notes/GetLimit",
                {},
                {headers: {
                        "Content-Type": "application/json",
                        "Cache-Control": "no-cache",
                        "Access-Control-Allow-Origin": "*",
                    }
                })

            if(resp.data.limit !== 0){
                console.log(resp)
                notesLimit = resp.data.limit
            }
        }
        catch (err){
            notesLimit = 10
            console.log(err)
        }

        return{
            token: null,
            username: null,
            isAuth: false,
            notesLimit: notesLimit,
            currentBoardId: -1
        }
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
