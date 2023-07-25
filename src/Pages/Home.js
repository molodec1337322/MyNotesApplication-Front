import {useContext, useState} from "react";
import MyModal from "../Modal/MyModal";
import Registration from "../components/Auth/Registration";
import Login from "../components/Auth/Login";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {AuthContext} from "../context";
import NoteCard from "../components/NoteCard/NoteCard";
import NotesCardList from "../components/NoteCard/NotesCardList";
import "./sidebar.css"

import "./Home.css"
import axios from "axios";
import {consts} from "../config/consts";

function Home() {

    const {auth, setAuth} = useContext(AuthContext)
    const [registrationModalActive, setRegistrationModalActive] = useState(false)
    const [loginModalActive, setLoginModalActive] = useState(false)
    const [columns, setColumns] = useState([
        {
            id: 0,
            name: "to Do",
            orderPalce: 0
        },
        {
            id: 1,
            name: "in progress",
            orderPalce: 1
        }
    ])
    const [notes, setNotes] = useState([
        {
            id: 0,
            title: "1111",
            text: "123654789*****",
            columnId: "0",
            orderPlace: "0"
        },
        {
            id: 1,
            title: "2222",
            text: "125645345354****",
            columnId: "1",
            orderPlace: "1"
        },
        {
            id: 2,
            title: "33333",
            text: "1236565465464569*****",
            columnId: "1",
            orderPlace: "0"
        },
        {
            id: 0,
            title: "44444444",
            text: "1236778752877575*****",
            columnId: "0",
            orderPlace: "1"
        }
    ])

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
            <div id="sidebar-wrapper" className="min-vh-100 d-none d-sm-none d-md-none d-lg-block d-xl-block d-xxl-block">
                <ul className="list-unstyled components">
                    <li className="navbar-item">
                        <p>1</p>
                    </li>
                    <li className="navbar-item">
                        <p>2</p>
                    </li>
                    <li className="navbar-item">
                        <p>3</p>
                    </li>
                </ul>
            </div>
            <div className="List">
                {cardList}
            </div>
        </div>
    );
}

export default Home;