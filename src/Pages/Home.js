import {useContext, useState} from "react";
import MyModal from "../Modal/MyModal";
import Registration from "../components/Auth/Registration";
import Login from "../components/Auth/Login";
import {Container, Nav, Navbar} from "react-bootstrap";
import {AuthContext} from "../context";

function Home() {

    const {auth, setAuth} = useContext(AuthContext)
    const [registrationModalActive, setRegistrationModalActive] = useState(false)
    const [loginModalActive, setLoginModalActive] = useState(false)

    return (
        <div className="Home">
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">My Notes App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Главная</Nav.Link>
                            <Nav.Link href="/about">О сайте</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <button className={"registration-btn"} onClick={() => setRegistrationModalActive(true)}>Регистрация</button>
            <MyModal active={registrationModalActive} setActive={setRegistrationModalActive}>
                <Registration/>
            </MyModal>

            <button className={"login-btn"} onClick={() => setLoginModalActive(true)}>Вход</button>
            <MyModal active={loginModalActive} setActive={setLoginModalActive}>
                <Login/>
            </MyModal>
        </div>
    );
}

export default Home;