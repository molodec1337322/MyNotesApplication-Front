import {useContext, useState} from "react";
import MyModal from "../Modal/MyModal";
import Registration from "../components/Auth/Registration";
import Login from "../components/Auth/Login";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {AuthContext} from "../context";
import NoteCard from "../components/NoteCard/NoteCard";
import NotesCardList from "../components/NoteCard/NotesCardList";

import "./Home.css"
import axios from "axios";
import {consts} from "../config/consts";

function Home() {

    const {auth, setAuth} = useContext(AuthContext)
    const [registrationModalActive, setRegistrationModalActive] = useState(false)
    const [loginModalActive, setLoginModalActive] = useState(false)
    const [notes, setNotes] = useState([])

    function logout (){
        setAuth(prev => {
            return{
                ...prev,
                token: null,
                username: null,
                isAuth: false
            }
        })
    }

    let buttons
    let cardList

    if(auth.isAuth){
        buttons =
            <Nav className="justify-content-end d-flex">
                <Navbar.Text>Вы вошли как: {auth.username}</Navbar.Text>
                <Button variant="outline-danger" className="mx-lg-2 mx-0 my-lg-0 my-2" onClick={() => logout}>Выйти</Button>
            </Nav>

        cardList =
            <NotesCardList notes={notes} setNotes={setNotes}/>
    }
    else{
        buttons =
                <Nav className="justify-content-end d-flex">
                    <Button variant="outline-success" className="mx-lg-2 mx-0 my-lg-0 my-2" onClick={() => setRegistrationModalActive(true)}>Регистрация</Button>
                    <MyModal active={registrationModalActive} setActive={setRegistrationModalActive}>
                        <Registration/>
                    </MyModal>

                    <Button variant="success" className="mx-lg-2 mx-0 my-lg-0 my-2" onClick={() => setLoginModalActive(true)}>Вход</Button>
                    <MyModal active={loginModalActive} setActive={setLoginModalActive}>
                        <Login setActive={setLoginModalActive}/>
                    </MyModal>
                </Nav>
        cardList =
            <div className="container-fluid row">
                <div className="d-flex justify-content-center">
                    <h3>Для использования приложения вам необходимо</h3>
                    <Button variant="outline-success" className="mx-lg-2 mx-0 my-lg-0 my-2" onClick={() => setLoginModalActive(true)}>Войти</Button>
                </div>
            </div>

    }

    return (
        <div className="Home">
            <Navbar className="bg-body-secondary sticky-top lg">
                <Container>
                    <Navbar.Brand href="/">My Notes App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    {buttons}
                </Container>
            </Navbar>
            <div className="List">
                {cardList}
            </div>
        </div>
    );
}

export default Home;