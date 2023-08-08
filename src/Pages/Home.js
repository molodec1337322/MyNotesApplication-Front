import React, {useContext, useState} from "react";
import MyModal from "../components/Modal/MyModal";
import Registration from "../components/Auth/Registration";
import Login from "../components/Auth/Login";
import {Button, Col, Container, Dropdown, DropdownButton, Form, Nav, Navbar, Offcanvas, Row} from "react-bootstrap";
import {AuthContext} from "../context/AuthContext";

import "./Home.css"
import ColumnsPlaceholder from "../components/ColumnsPlaceholder/ColumnsPlaceholder";
import MySidebar from "../components/MySidebar/MySidebar";
import axios from "axios";
import {consts} from "../config/consts";
import NewMemberInvite from "../components/NewMemeberInvite/NewMemberInvite";
import ShowNoteWindow from "../components/NoteCard/ShowNoteWindow";
import EditNoteWindow from "../components/NoteCard/EditNoteWindow";

function Home() {

    const {auth, setAuth} = useContext(AuthContext)

    const [registrationModalActive, setRegistrationModalActive] = useState(false)
    const [loginModalActive, setLoginModalActive] = useState(false)
    const [sidebarActive, setSidebarActive] = useState(false)
    const [inviteNewMemberModalActive, setInviteNewMemberModalActive] = useState(false)

    const [ownedBoards, setOwnedBoards] = useState([])
    const [guestBoards, setGuestBoards] = useState([])

    const [guestBoardUsers, setGuestBoardUsers] = useState([])
    const [ownersBoardUser, setOwnersBoardUsers] = useState([])

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

        let respOwners = await axios.get(consts.API_SERVER + "/api/v1/Boards/Owners/" + boardId,
            {headers: {
                    Authorization: auth.token
                }
            })
        let respGuest = await axios.get(consts.API_SERVER + "/api/v1/Boards/Guests/" + boardId,
            {headers: {
                    Authorization: auth.token
                }
            })

        setOwnersBoardUsers(respOwners.data)
        setGuestBoardUsers(respGuest.data)

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
    let boardNav
    let sidebar

    if(auth.isAuth){
        buttons =
            <Nav className="justify-content-end d-flex">
                <Navbar.Text>Вы вошли как: {auth.username}</Navbar.Text>
                <Button variant="outline-danger" className="mx-lg-2 mx-0 my-lg-0 my-2" onClick={logout}>Выйти</Button>
            </Nav>

        sidebar =
            <MySidebar active={sidebarActive} setActive={setSidebarActive}
                       ownedBoards={ownedBoards} setOwnedBoards={setOwnedBoards} guestBoards={guestBoards}
                       currentBoard={currentBoardId} setCurrentBoard={setCurrentBoardId}
                       onBoardChanged={onBoardChangeHandler}
            />

        board =
            <ColumnsPlaceholder columns={columns} setColumns={setColumns} notes={notes}
                                setNotes={setNotes} currentBoardId={currentBoardId}/>

        boardNav =
            <Row>
                <Col>
                    <h4>{currentBoardName}</h4>
                </Col>

                <Col md="1">
                    <div className="d-flex flex-row">
                        <DropdownButton variant="light" className="mx-lg-2 mx-0 my-lg-0 my-2" id="dropdown-basic-button" title={
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                                 className="bi bi-people" viewBox="0 0 16 16">
                                <path
                                    d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>
                            </svg>}>
                            <Dropdown.Item><h5>Создатели</h5></Dropdown.Item>
                            <Dropdown.Divider />
                            {ownersBoardUser?.map((owner, index) => (
                                <Dropdown.Item>{owner.username}</Dropdown.Item>
                            ))}
                            <Dropdown.Divider />
                            <Dropdown.Item><h5>Гости</h5></Dropdown.Item>
                            <Dropdown.Divider />
                            {guestBoardUsers?.map((guest, index) => (
                                <Dropdown.Item>{guest.username}</Dropdown.Item>
                            ))}
                        </DropdownButton>
                        <Button variant="light" className="mx-lg-2 mx-0 my-lg-0 my-2" onClick={() => setInviteNewMemberModalActive(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                                 className="bi bi-person-add" viewBox="0 0 16 16">
                                <path
                                    d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
                                <path
                                    d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z"/>
                            </svg>
                        </Button>
                        <MyModal active={inviteNewMemberModalActive} setActive={setInviteNewMemberModalActive}>
                            <NewMemberInvite setActive={setInviteNewMemberModalActive} boardId={currentBoardId}/>
                        </MyModal>
                    </div>
                </Col>
            </Row>
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
                {boardNav}
            </div>

            <br/>

            <div className="Board">

                {board}
            </div>
        </div>
    );
}

export default Home;