import {useContext, useState} from "react";
import MyModal from "../components/Modal/MyModal";
import Registration from "../components/Auth/Registration";
import Login from "../components/Auth/Login";
import {Button, Container, Nav, Navbar, Offcanvas} from "react-bootstrap";
import {AuthContext} from "../context/AuthContext";

import "./Home.css"
import ColumnsPlaceholder from "../components/ColumnsPlaceholder/ColumnsPlaceholder";
import MySidebar from "../components/MySidebar/MySidebar";
import axios from "axios";
import {consts} from "../config/consts";

function Home() {

    const {auth, setAuth} = useContext(AuthContext)

    const [registrationModalActive, setRegistrationModalActive] = useState(false)
    const [loginModalActive, setLoginModalActive] = useState(false)
    const [sidebarActive, setSidebarActive] = useState(false)

    const [ownedBoards, setOwnedBoards] = useState([])
    const [guestBoards, setGuestBoards] = useState([])

    const [currentBoardName, setCurrentBoardName] = useState("")
    const [currentBoardId, setCurrentBoardId] = useState(-1)
    const [columns, setColumns] = useState([])
    const [notes, setNotes] = useState([])


    function logout(){
        setAuth(prev => {
            return{
                ...prev,
                token: null,
                username: null,
                isAuth: false
            }
        })
    }

    async function onBoardChangeHandler(boardName, boardId, isBoardOwner){

        let respColumns = await axios.get(consts.API_SERVER + "/api/v1/Columns/FromBoard/" + boardId,
            {headers: {
                Authorization: auth.token
                }
            })

        setCurrentBoardName(boardName)
        let columns = []
        let notes = []

        for (let i = 0; i < respColumns.data.length; i++){
            notes = [...notes, ...respColumns.data[i].notes]
            columns = [
                ...columns,
                {
                    id: respColumns.data[i].id,
                    name: respColumns.data[i].name,
                    orderPlace: respColumns.data[i].orderPlace
                }
                ]
        }

        columns.sort((a, b) => parseFloat(a.orderPlace) - parseFloat(b.orderPlace))

        setNotes(notes)
        setColumns(columns)

        setAuth(prev => {
            return{
                ...prev,
                isBoardOwner: isBoardOwner,
            }
        })
    }

    async function onAuth(token){
        let respBoardsOwned = await axios.get(consts.API_SERVER + "/api/v1/Boards/AllOwned",
            {headers: {
                    Authorization: token
                }
            })

        let respBoardsGuest = await axios.get(consts.API_SERVER + "/api/v1/Boards/AllGuest",
            {headers: {
                    Authorization: token
                }
            })

        setOwnedBoards(respBoardsOwned.data)
        setGuestBoards(respBoardsGuest.data)
    }

    let buttons
    let board
    let sidebar

    if(auth.isAuth){
        buttons =
            <Nav className="justify-content-end d-flex">
                <Navbar.Text>Вы вошли как: {auth.username}</Navbar.Text>
                <Button variant="outline-danger" className="mx-lg-2 mx-0 my-lg-0 my-2" onClick={logout}>Выйти</Button>
            </Nav>

        sidebar =
            <MySidebar active={sidebarActive} setActive={setSidebarActive}
                       ownedBoards={ownedBoards} guestBoards={guestBoards}
                       currentBoard={currentBoardId} setCurrentBoard={setCurrentBoardId}
                       onBoardChanged={onBoardChangeHandler}
            />

        board =
                <ColumnsPlaceholder columns={columns} setColumns={setColumns} notes={notes} setNotes={setNotes} currentBoardId={currentBoardId}/>
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
                        <Login setActive={setLoginModalActive} onAuth={onAuth}/>
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
                    <Nav className="justify-content-start d-flex">
                        <Button variant="Light" className="mx-lg-2 mx-0 my-lg-0 my-2" onClick={() => setSidebarActive(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                                 className="bi bi-list" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                      d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                            </svg>
                        </Button>
                        <Navbar.Brand href="/">My Notes App</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    </Nav>

                    {buttons}
                </Container>
            </Navbar>

            {sidebar}

            <br/>
            <div className="BoardNav container">
                <div className="row">
                    <div className="col-4 d-flex">
                        <h4>{currentBoardName}</h4>
                    </div>
                    <div className="col-4">

                    </div>
                    <div className="col-4 d-flex">
                        <Button className="mx-lg-2 mx-0 my-lg-0 my-2">---</Button>
                        <Button className="mx-lg-2 mx-0 my-lg-0 my-2">+++</Button>
                    </div>
                </div>
            </div>

            <br/>

            <div className="Board">
                {board}
            </div>
        </div>
    );
}

export default Home;