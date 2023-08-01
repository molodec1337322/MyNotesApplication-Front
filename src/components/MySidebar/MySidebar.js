import React, {useState} from "react";
import {CDBSidebar, CDBSidebarContent, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem} from "cdbreact";

function MySidebar({active, setActive, boards, setBoards}){

    const [users, setUsers] = useState()

    return (
        <div className={active ? "MySidebar active " : "MySidebar"} onClick={() => setActive(false)}>
            <div className={active ? "MySidebarContent active" : "MySidebarContent"} onClick={e => e.stopPropagation()}>
                <CDBSidebar textColer="#aaa" backgroundColor="rgb(230, 230, 230)">
                    <CDBSidebarHeader>
                        <h5>Ваши доски</h5>
                    </CDBSidebarHeader>

                    <CDBSidebarContent>
                        <CDBSidebarMenu title="Sidemenu 1">
                            <CDBSidebarMenuItem>submenu 1</CDBSidebarMenuItem>
                            <CDBSidebarMenuItem>submenu 2</CDBSidebarMenuItem>
                            <CDBSidebarMenuItem>submenu 3</CDBSidebarMenuItem>
                        </CDBSidebarMenu>

                        <CDBSidebarMenu title="Sidemenu 1">
                            <CDBSidebarMenuItem>submenu 1</CDBSidebarMenuItem>
                            <CDBSidebarMenuItem>submenu 2</CDBSidebarMenuItem>
                            <CDBSidebarMenuItem>submenu 3</CDBSidebarMenuItem>
                        </CDBSidebarMenu>
                    </CDBSidebarContent>

                </CDBSidebar>
            </div>
        </div>
    )

}

export default MySidebar