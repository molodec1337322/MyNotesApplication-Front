import React from "react";
import "./MyModal.css"

function MyModal({active, setActive, children}){
    return (
        <div className={active ? "MyModal active" : "MyModal"} onClick={() => setActive(false)}>
            <div className={active ? "MyModalContent active" : "MyModalContent"} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default MyModal;