import React, {useState} from "react";
import {CDBSidebar, CDBSidebarContent} from "cdbreact";

function MySidebar({boards, setBoards}){

    const [users, setUsers] = useState()

    return (
        <CDBSidebar >
            <CDBSidebarContent className="sidebar-content">
                <p>1</p>
                <p>2</p>
                <p>3</p>
            </CDBSidebarContent>
        </CDBSidebar>
    )

}

export default MySidebar