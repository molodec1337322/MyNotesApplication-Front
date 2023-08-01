import React, {useState} from "react";
import {CDBSidebar, CDBSidebarContent, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem} from "cdbreact";
import {Offcanvas} from "react-bootstrap";

function MySidebar({active, setActive, ownedBoards, setOwnedBoards, guestBoards, setGuestBoards}){

    const [users, setUsers] = useState()

    return (
        <Offcanvas show={active} onHide={() => setActive(false)}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Доски</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
                <Offcanvas.Title>Ваши доски</Offcanvas.Title>
                {ownedBoards?.map((board, index) => (
                    <div>
                        <p>{board.name}</p>
                    </div>
                ))}
                <Offcanvas.Title>Гостевые доски</Offcanvas.Title>
                {guestBoards?.map((board, index) => (
                    <div>
                        <p>{board.name}</p>
                    </div>
                ))}
            </Offcanvas.Body>
        </Offcanvas>
    )

}

export default MySidebar