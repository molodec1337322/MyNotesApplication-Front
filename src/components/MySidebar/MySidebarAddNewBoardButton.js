import React, {useContext, useState} from "react";
import {Button} from "react-bootstrap";
import MyModal from "../Modal/MyModal";
import MySidebarAddNewBoardWindow from "./MySidebarAddNewBoardWindow";

function MySidebarAddNewBoardButton({setOwnedBoards}){

    const [active, setActive] = useState(false)

    return(
        <div>
            <Button variant="outline-success" className="mx-lg-2 mx-0 my-lg-0 my-2" onClick={() => setActive(true)}>Новая доска</Button>
            <MyModal active={active} setActive={setActive}>
                <MySidebarAddNewBoardWindow setModalActive={setActive} setOwnedBoards={setOwnedBoards}></MySidebarAddNewBoardWindow>
            </MyModal>
        </div>
    )

}

export default MySidebarAddNewBoardButton;