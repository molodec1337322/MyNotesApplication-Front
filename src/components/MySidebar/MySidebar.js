import React, {useState} from "react";
import {Accordion, Offcanvas} from "react-bootstrap";
import MySidebarBoardButton from "./MySidebarBoardButton";
import MySidebarAddNewBoardButton from "./MySidebarAddNewBoardButton";

function MySidebar({active, setActive, ownedBoards, setOwnedBoards, guestBoards, currentBoard, setCurrentBoard, onBoardChanged}){

    return (
        <Offcanvas show={active} onHide={() => setActive(false)}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Меню</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>

                <Accordion defaultActiveKey="-1">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header><Offcanvas.Title>Ваши доски</Offcanvas.Title></Accordion.Header>
                        <Accordion.Body>
                            {ownedBoards?.map((board, index) => (
                                <MySidebarBoardButton name={board.name} boardId={board.id}
                                                      currentBoard={currentBoard} setCurrentBoard={setCurrentBoard}
                                                      onBoardChanged={onBoardChanged} isOwner={true}
                                />
                            ))}
                            <MySidebarAddNewBoardButton setOwnedBoards={setOwnedBoards}/>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                        <Accordion.Header><Offcanvas.Title>Гостевые доски</Offcanvas.Title></Accordion.Header>
                        <Accordion.Body>
                            {guestBoards?.map((board, index) => (
                                <MySidebarBoardButton name={board.name} boardId={board.id}
                                                      currentBoard={currentBoard} setCurrentBoard={setCurrentBoard}
                                                      onBoardChanged={onBoardChanged} isOwner={false}
                                />
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

            </Offcanvas.Body>
        </Offcanvas>
    )

}

export default MySidebar