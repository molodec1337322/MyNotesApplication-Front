import React, {useState} from "react";
import {CDBSidebar, CDBSidebarContent, CDBSidebarHeader} from "cdbreact";

function MySidebar({boards, setBoards}){

    const [users, setUsers] = useState()

    const [open, setOpen] = useState()

    return (
        <CDBSidebar textColer="#aaa" backgroundColor="rgb(230, 230, 230)">
            <CDBSidebarHeader>
                <h5>Ваши доски</h5>
            </CDBSidebarHeader>
            <CDBSidebarContent className="sidebar-content">
                <p>1</p>
                <p>2</p>
                <p>3</p>
            </CDBSidebarContent>
            <CDBSidebarHeader>
                <h5>Участие в досках</h5>
            </CDBSidebarHeader>
            <CDBSidebarContent className="sidebar-content">
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>1</p>
                <p>2</p>
            </CDBSidebarContent>
        </CDBSidebar>
    )

}

export default MySidebar