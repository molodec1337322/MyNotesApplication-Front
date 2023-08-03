import React, {useState} from "react";
import {CDBSidebar, CDBSidebarContent, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem} from "cdbreact";
import {Offcanvas} from "react-bootstrap";
import MySidebarBoardButton from "./MySidebarBoardButton";

function MySidebar({active, setActive, ownedBoards, guestBoards, currentBoard, setCurrentBoard, onBoardChanged}){

    return (
        <Offcanvas show={active} onHide={() => setActive(false)}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Меню</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
                <Offcanvas.Title>Ваши доски</Offcanvas.Title>
                {ownedBoards?.map((board, index) => (
                    <MySidebarBoardButton name={board.name} boardId={board.id}
                                          currentBoard={currentBoard} setCurrentBoard={setCurrentBoard}
                                          onBoardChanged={onBoardChanged} isOwner={true}
                    />
                ))}
                <Offcanvas.Title>Гостевые доски</Offcanvas.Title>
                {guestBoards?.map((board, index) => (
                    <MySidebarBoardButton name={board.name} boardId={board.id}
                                          currentBoard={currentBoard} setCurrentBoard={setCurrentBoard}
                                          onBoardChanged={onBoardChanged} isOwner={false}
                    />
                ))}
            </Offcanvas.Body>
        </Offcanvas>
    )

}

export default MySidebar