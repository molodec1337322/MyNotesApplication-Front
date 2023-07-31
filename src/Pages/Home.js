import {useContext, useState} from "react";
import MyModal from "../Modal/MyModal";
import Registration from "../components/Auth/Registration";
import Login from "../components/Auth/Login";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {AuthContext} from "../context";

import "./Home.css"
import ColumnsPlaceholder from "../components/ColumnsPlaceholder/ColumnsPlaceholder";
import MySidebar from "../components/MySidebar/MySidebar";

function Home() {

    const {auth, setAuth} = useContext(AuthContext)
    const [registrationModalActive, setRegistrationModalActive] = useState(false)
    const [loginModalActive, setLoginModalActive] = useState(false)
    const [columns, setColumns] = useState([
        {
            id: 0,
            name: "Сделать",
            orderPlace: 0
        },
        {
            id: 1,
            name: "Взято в работу",
            orderPlace: 1
        }
    ].sort((a, b) => parseFloat(a.orderPlace) - parseFloat(b.orderPlace)))
    const [notes, setNotes] = useState([
        {
            id: 0,
            title: "1111",
            text: "12369*****",
            columnId: "0",
            orderPlace: "0"
        },
        {
            id: 1,
            title: "2222",
            text: "1256454****",
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
            id: 3,
            title: "44444444",
            text: "1236778752877575*****",
            columnId: "0",
            orderPlace: "1"
        }
    ].sort((a, b) => parseFloat(a.orderPlace) - parseFloat(b.orderPlace)))

    const [boards, setBoards] = useState()

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
    let board

    if(auth.isAuth){
        buttons =
            <Nav className="justify-content-end d-flex">
                <Navbar.Text>Вы вошли как: {auth.username}</Navbar.Text>
                <Button variant="outline-danger" className="mx-lg-2 mx-0 my-lg-0 my-2" onClick={() => logout}>Выйти</Button>
            </Nav>

        board =
            <ColumnsPlaceholder columns={columns} setColumns={setColumns} notes={notes} setNotes={setNotes}/>
    }
    else{
        buttons =
                <Nav className="justify-content-end d-flex">
                    <Button variant="outline-success" className="mx-lg-2 mx-0 my-lg-0 my-2" onClick={() => setRegistrationModalActive(true)}>Регистрация</Button>
                    <MyModal active={registrationModalActive} setActive={setRegistrationModalActive}>
                        <Registration/>
                    </MyModal>

                    <Button variant="success" className="mx-lg-2 mx-0 my-lg-0 my-2" onClick={() => {
                        console.log(auth.then(res => {console.log(res)}))
                        setLoginModalActive(true)}}>Вход</Button>
                    <MyModal active={loginModalActive} setActive={setLoginModalActive}>
                        <Login setActive={setLoginModalActive}/>
                    </MyModal>
                </Nav>
        board =
            <div className="container-fluid row">
                <div className="d-flex justify-content-center">
                    <h3>Для использования приложения вам необходимо авторизироваться!</h3>
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
            <div className="Sidebar">
                <MySidebar boards={boards} setBoards={setBoards}/>
            </div>
            <div className="Board">
                {board}
            </div>
        </div>
    );
}

export default Home;