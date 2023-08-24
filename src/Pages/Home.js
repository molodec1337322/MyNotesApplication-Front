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
import ResetPassword from "../components/Auth/ResetPassword";
import EditBoardWindow from "../components/Board/EditBoardWindow";
import {UseInterval} from "../components/UseInterval/UseInterval";

function Home() {

    const {auth, setAuth} = useContext(AuthContext)

    const [registrationModalActive, setRegistrationModalActive] = useState(false)
    const [loginModalActive, setLoginModalActive] = useState(false)
    const [resetPasswordModalActive, setResetPasswordModalActive] = useState(false)
    const [sidebarActive, setSidebarActive] = useState(false)
    const [inviteNewMemberModalActive, setInviteNewMemberModalActive] = useState(false)
    const [editBoardActive, setEditBoardActive] = useState(false)

    const [ownedBoards, setOwnedBoards] = useState([])
    const [guestBoards, setGuestBoards] = useState([])

    const [guestBoardUsers, setGuestBoardUsers] = useState([])
    const [ownersBoardUser, setOwnersBoardUsers] = useState([])

    const [currentBoardName, setCurrentBoardName] = useState("")
    const [currentBoardId, setCurrentBoardId] = useState(-1)
    const [columns, setColumns] = useState([])
    const [notes, setNotes] = useState([])

    UseInterval(() => {
        if(currentBoardId !== -1){
            onBoardChangeHandler(currentBoardName, currentBoardId, auth.isBoardOwner)
        }
    }, 1000 * 1)

    function logout(){
        setAuth(prev => {
            return{
                ...prev,
                token: null,
                username: null,
                isAuth: false,
                isBoardOwner: false
            }
        })
        setOwnedBoards([])
        setGuestBoards([])
        setOwnersBoardUsers([])
        setGuestBoardUsers([])
        setCurrentBoardName("")
        setCurrentBoardId(-1)
        setColumns([])
        setNotes([])
    }

    function onOpenChangePasswordWindow(){
        setLoginModalActive(false)
        setResetPasswordModalActive(true)
    }

    async function onBoardChangeHandler(boardName, boardId, isBoardOwner){

        console.log(boardName)

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

        notes.sort((a, b) => parseFloat(a.orderPlace) - parseFloat(b.orderPlace))
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

    function changeBoard(boardId){
        setCurrentBoardId(boardId)
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

    async function onEditBoard(boardId, boardName, setLoading){
        setLoading(true)
        setLoading(false)
    }

    async function deleteCurrentBoard(){

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

        if(currentBoardId === -1){
            board =
                <div>
                    <Row>
                        <Col md="6" className="d-flex justify-content-center">
                            <div className="BoardsListMain">
                                <h4>Ваши доски</h4>

                                <div>
                                    {ownedBoards?.map((board, index) => (
                                        <li><Button className="BtnBoardsList" variant="light" onClick={() => {
                                            changeBoard(board.id)
                                            onBoardChangeHandler(board.name, board.id, true)}}>{board.name}</Button></li>
                                    ))}
                                </div>
                            </div>
                        </Col>

                        <Col md="6" className="d-flex justify-content-center">
                            <div className="BoardsListMain">
                                <h4>Гостевые доски</h4>

                                <div>
                                    {guestBoards?.map((board, index) => (
                                        <li><Button className="BtnBoardsList" variant="light" onClick={() => {
                                            changeBoard(board.id)
                                            onBoardChangeHandler(board.name, board.id, false)}}>{board.name}</Button></li>
                                    ))}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
        }
        else{
            board =
                <ColumnsPlaceholder columns={columns} setColumns={setColumns} notes={notes}
                                    setNotes={setNotes} currentBoardId={currentBoardId}/>

            boardNav =
                <Row>
                    <Col>
                        <div className="d-flex flex-row">
                            <h4>{currentBoardName}</h4>
                            <Dropdown id="dropdown-note-params-button">

                                <Dropdown.Toggle className="bg-transparent" variant="light">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                                         className="bi bi-gear" viewBox="0 0 16 16">
                                        <path
                                            d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                                        <path
                                            d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                                    </svg>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        <Button onClick={()=> setEditBoardActive(true)} variant="outline-dark" className="container-fluid">Редактировать</Button>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <Button onClick={deleteCurrentBoard} className="container-fluid" variant="outline-danger">Удалить</Button>
                                    </Dropdown.Item>
                                </Dropdown.Menu>

                            </Dropdown>
                            <MyModal active={editBoardActive} setActive={setEditBoardActive}>
                                <EditBoardWindow onEditBoardHandler={onEditBoard} boardName={currentBoardName} setBoardName={setCurrentBoardName} setActive={setEditBoardActive} boardId={currentBoardId}/>
                            </MyModal>
                        </div>

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
                            <Button variant="light" className="mx-lg-2 mx-0 my-lg-0 my-2" disabled={auth.isBoardOwner? false : true} onClick={() => setInviteNewMemberModalActive(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                                     className="bi bi-person-add" viewBox="0 0 16 16">
                                    <path
                                        d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
                                    <path
                                        d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z"/>
                                </svg>
                            </Button>
                            <MyModal active={inviteNewMemberModalActive} setActive={setInviteNewMemberModalActive}>
                                <NewMemberInvite setActive={setInviteNewMemberModalActive} boardId={currentBoardId} />
                            </MyModal>
                        </div>
                    </Col>
                </Row>
        }
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
                        <Login setActive={setLoginModalActive} onAuth={onAuth} handleOnOpenPasswordChangeWindow={onOpenChangePasswordWindow}/>
                    </MyModal>

                    <MyModal active={resetPasswordModalActive} setActive={setResetPasswordModalActive}>
                        <ResetPassword setActive={setResetPasswordModalActive}/>
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
                                <path fillRule="evenodd"
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