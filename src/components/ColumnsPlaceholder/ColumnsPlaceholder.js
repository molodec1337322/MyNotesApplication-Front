import React, {useContext, useState} from "react";
import {DragDropContext, Draggable} from "react-beautiful-dnd";
import Column from "../Column/Column";
import CreateNewColumnBtn from "../Column/CreateNewColumnBtn";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import {consts} from "../../config/consts";
import "./ColumnsPlaceholder.css"
import MyModal from "../Modal/MyModal";
import ShowNoteWindow from "../NoteCard/ShowNoteWindow";
import EditNoteWindow from "../NoteCard/EditNoteWindow";
import EditColumnWindow from "../Column/EditColumnWindow";

function ColumnsPlaceholder({columns, setColumns, notes, setNotes, currentBoardId}){

    const {auth, setAuth} = useContext(AuthContext)

    const [showNoteActive, setShowNoteActive] = useState(false)
    const [editNoteActive, setEditNoteActive] = useState(false)
    const [noteData, setNoteData] = useState({id: -1, name: "", text: ""})

    const [editColumnActive, setEditColumnActive] = useState(false)
    const [columnData, setColumnData] = useState({id: -1, name: ""})

    function handleOnDragEnd(result){

        if(!result.destination){
            return;
        }

        if(result.destination.droppableId === result.source.droppableId && result.destination.index === result.source.index){
            return;
        }

        if(result.destination.droppableId === result.source.droppableId){
            const items = Array.from(notes.filter(note => {return note.columnId.toString() === result.source.droppableId.toString()}))
            const otherItems = Array.from(notes.filter(note => {return note.columnId.toString() !== result.source.droppableId.toString()}))

            const [reorderedItem] = items.splice(result.source.index, 1)
            reorderedItem.orderPlace = result.destination.index
            items.splice(result.destination.index, 0, reorderedItem)

            const allItems = [...otherItems, ...items]

            updateOrderPlace(allItems)
            //setNotes(allItems)
        }
        else{
            const itemsStart = Array.from(notes.filter(note => {return note.columnId.toString() === result.source.droppableId.toString()}))
            const itemsEnd = Array.from(notes.filter(note => {return note.columnId.toString() === result.destination.droppableId.toString()}))
            const otherItems = Array.from(notes.filter(note => {
                return note.columnId.toString() !== result.source.droppableId.toString() && note.columnId.toString() !== result.destination.droppableId.toString()
            }))

            const [reorderedItem] = itemsStart.splice(result.source.index, 1)
            reorderedItem.orderPlace = result.destination.index
            reorderedItem.columnId = result.destination.droppableId
            itemsEnd.splice(result.destination.index, 0, reorderedItem)

            const allItems = [...otherItems, ...itemsStart, ...itemsEnd]

            updateOrderPlace(allItems)
            //setNotes(allItems)
        }
    }

    async function updateOrderPlace(notes){
        let updatedNotes = {
            boardId: currentBoardId,
            notes: notes,
        }

        let resp = await axios.put(consts.API_SERVER + "/api/v1/Notes/UpdatePlacement",
            updatedNotes,
            {headers: {
                    Authorization: auth.token
                }
            })

        setNotes(notes)
    }

    async function handleOnDeleteNote(id){
        let items = Array.from(notes)

        let resp = await axios.delete(consts.API_SERVER + "/api/v1/Notes/Delete/" + id,
            {headers: {
                    Authorization: auth.token
                }
            })

        items.splice(items.findIndex(note => note.id === id), 1)
        setNotes(items)
    }

    async function handleOnAddNote(name, text, columnId, boardId){

        let newNote = {
            id: notes.length,
            name: name,
            text: text,
            orderPlace: notes.filter(note => {return note.columnId === columnId}).length,
            columnId: columnId,
            boardId: boardId
        }

        let resp= await axios.post(consts.API_SERVER + "/api/v1/Notes/Add",
            newNote,
            {headers: {
                    Authorization: auth.token
                }
            })

        setNotes(prev => {
            return[
                ...prev,
                resp.data
            ]
        })
    }

    function handleOnShowNote(note){
        setShowNoteActive(true)
        setNoteData(note)
    }

    function handleOnShowEditNote(note){
        setEditNoteActive(true)
        setNoteData(note)
    }

    async function handleOnAddColumn(name){

        let newColumn = {
            name: name,
            orderPlace: columns.length,
            boardId: currentBoardId
        }

        let resp = await axios.post(consts.API_SERVER + "/api/v1/Columns/Create",
            newColumn,
            {headers: {
                    Authorization: auth.token
                }
            })

        setColumns(prev => {
            return[
                ...prev,
                resp.data
            ]
        })

    }

    async function handleOnEditNote(note){

    }

    function handleOnShowEditColumn(column){
        setEditColumnActive(true)
        setColumnData(column)
    }

    async function handleOnDeleteColumn(id){

        let items = Array.from(columns)
        let notesItems = Array.from(notes)

        let resp = await axios.delete(consts.API_SERVER + "/api/v1/Columns/Delete/" + id,
            {headers: {
                    Authorization: auth.token
                }
            })

        items.splice(items.findIndex(col => col.id === id), 1)
        setColumns(items)
    }

    async function handleOnEditColumn(column){

    }

    let addCol
    if(auth.isBoardOwner){
        addCol =
            <CreateNewColumnBtn onAddColumnHandler={handleOnAddColumn}/>
    }

    return(
        <div className="BoardPlaceholder position-fixed d-flex justify-content-start">

            <MyModal active={showNoteActive} setActive={setShowNoteActive}>
                <ShowNoteWindow note={noteData}/>
            </MyModal>
            <MyModal active={editNoteActive} setActive={setEditNoteActive}>
                <EditNoteWindow noteData={noteData} setActive={setEditNoteActive} onEditNoteHandler={handleOnEditNote}/>
            </MyModal>

            <MyModal active={editColumnActive} setActive={setEditColumnActive}>
                <EditColumnWindow columnData={columnData} setActive={setEditColumnActive} onEditColumnHandler={handleOnEditColumn}/>
            </MyModal>

            <DragDropContext onDragEnd={handleOnDragEnd}>
                {columns?.map((column, index) => (
                    <Column notes={notes} col={column} boardId={currentBoardId}
                            handleOnDeleteNote={handleOnDeleteNote} handleOnAddNote={handleOnAddNote}
                            onShowNoteHandler={handleOnShowNote} onShowEditNoteHandler={handleOnShowEditNote}
                            onShowEditColumnHandler={handleOnShowEditColumn} onDeleteColumnHandler={handleOnDeleteColumn}></Column>
                ))}
            </DragDropContext>
            {addCol}
        </div>
    )
}

export default ColumnsPlaceholder;