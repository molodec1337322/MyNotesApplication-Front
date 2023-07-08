import {useState} from 'react'
import MyButton from "./components/MyButton/MyButton";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./Pages/Home"
import About from "./Pages/About"

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/home" element={<Home/>}/>
              <Route path="/about" element={<About/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
