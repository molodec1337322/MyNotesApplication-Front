import React from "react";
import "./MyModal.css"

function MyModal({active, setActive, children}){

    return (
        <div className={active ? "MyModal active " : "MyModal"} onClick={() => setActive(false)}>
            <div className={active ? "MyModalContent active col-sm-8 col-md-4 col-lg-3" : "MyModalContent col-sm-8 col-md-4 col-lg-3"} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default MyModal;