import React, {useState} from "react";
import {Button, Card, Form} from "react-bootstrap";
import "./NoteCard.css"

function NoteCard(props) {

    const [cardData, setCardData] = useState(() => {
        return{
            id: props.id,
            title: props.title,
            body: props.body
        }
    })

    function checkNote(e){
        e.preventDefault()
        alert("check")
    }

    function deleteNote(e){
        e.preventDefault()
        alert("del")
    }

    return(
        <Card className={"NoteCard"} style={{width: "18rem"}}>
            <Card.Body>
                <Card.Title>{cardData.title}</Card.Title>
                <Card.Text>
                    {cardData.body}
                </Card.Text>
                <Form>

                </Form>
                <Button className="mx-lg-2 mx-0 my-lg-0 my-2" variant="success-outline" onClick={e => checkNote(e)}>Выполнено</Button>
                <Button className="mx-lg-2 mx-0 my-lg-0 my-2" variant="danger" onClick={e => deleteNote(e)}>Удалить</Button>
            </Card.Body>
        </Card>
    )
}

export default NoteCard;