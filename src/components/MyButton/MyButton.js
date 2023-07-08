import React, { useState } from 'react';

function MyButton({children, ...props}){

    const [count, setCount] = useState(0);

    function handleClick(e){
        e.preventDefault()
        setCount(count + 1)
    }

    return <button {...props} onClick={handleClick}>Clicked {count} times {children}</button>
}

export default MyButton;