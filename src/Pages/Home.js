import {useState} from "react";
import MyModal from "../Modal/MyModal";
import Registration from "../components/Auth/Registration";
import Login from "../components/Auth/Login";

function Home() {

    const [registrationModalActive, setRegistrationModalActive] = useState(false)
    const [loginModalActive, setLoginModalActive] = useState(false)

    return (
        <div className="App11">
            <h1>Home page</h1>
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