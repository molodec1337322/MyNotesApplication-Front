import {useState} from "react";
import MyModal from "../Modal/MyModal";
import Registration from "../components/Auth/Registration";

function Home() {

    const [modalActive, setModalActive] = useState(false)

    return (
        <div className="App11">
            <h1>Home page</h1>
            <button className={"open-btn"} onClick={() => setModalActive(true)}>Click me!</button>
            <MyModal active={modalActive} setActive={setModalActive}>
                <Registration/>
            </MyModal>
        </div>
    );
}

export default Home;