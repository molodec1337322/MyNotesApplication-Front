import React, {useState} from 'react'
import MyButton from "./components/MyButton/MyButton";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./Pages/Home"
import About from "./Pages/About"
import {AuthContext} from "./context";

function App() {
    const [auth, setAuth] = useState(() => {
        return{
            token: null,
            username: null,
            isAuth: false
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