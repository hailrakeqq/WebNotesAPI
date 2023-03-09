import React, { useEffect, useState } from 'react';
import '../css/ViewNotePage.css'
import { Modal } from '../components/Modal.js';
import { useNavigate } from 'react-router-dom';
import MyInput from "../components/MyInput";

function ViewNotePage() {
    const [note, setNote] = useState([]);
    const [modalActive, setModalActive] = useState(false)
    const [inputText, setInputText] = useState('');
    const saveButton = document.querySelector('#btnSave')
    const deleteButton = document.querySelector('#btnDelete')
    let jwtToken = localStorage.getItem('jwttoken');
    const navigate = useNavigate()


    let currentUser = localStorage.getItem('username')
    if (currentUser === "" || currentUser === null)
        navigate('/LoginPage');


    const addNote = () => {
        let title = document.getElementById('title').value
        let description = document.getElementById('description').value

        if (title === "" || title === null || description === "" || description === null) {
            alert("Please enter correct data")
        } else {
            const note = {
                title: title,
                description: description
            }
            fetch('http://localhost:8088/api/Notes', {
                method: 'POST',
                headers: {
                    'Authorization': `bearer ${jwtToken}`,
                    'content-type': 'application/json'
                },
                body: JSON.stringify(note)
            }).then(responce => responce.json())
                // clear input and close modal window and refresh page for render new note
                .then(() => {
                    title = ""
                    description = ""
                    setModalActive(false)
                    document.location.reload(false)
                })
        }
    }

    const updateNote = (id) => {
        let title = document.getElementById('title').value
        let description = document.getElementById('description').value

        if (title === "" || title === null || description === "" || description === null) {
            alert("Please enter correct data")
        } else {
            const note = {
                title: title,
                description: description
            }
            fetch(`http://localhost:8088/api/Notes/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `bearer ${jwtToken}`,
                    'content-type': 'application/json'
                },
                body: JSON.stringify(note)
            }).then(responce => responce.json())
                // clear input and close modal window and refresh page for render new note
                .then(() => {
                    title = ""
                    description = ""
                    setModalActive(false)
                    document.location.reload(false)
                })
        }
    }

    const deleteNote = (id) => {
        fetch(`http://localhost:8088/api/Notes/${id}`, {

            method: 'DELETE',
            headers: {
                'Authorization': `bearer ${jwtToken}`,
                'content-type': 'application/json'
            }
        }).then(() => {
            setModalActive(false)
            document.location.reload(false)
        })
    }

    const deleteAllNotes = () => {
        fetch(`http://localhost:8088/api/Notes/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `bearer ${jwtToken}`,
                'content-type': 'application/json'
            }
        }).then(() => document.location.reload(false))
    }

    const fetchData = () => {
        return fetch('http://localhost:8088/api/Notes',
            {
                method: 'GET',
                headers: {
                    'Authorization': `bearer ${jwtToken}`,
                }
            }).then(data => data.status === 401 ? navigate('/LoginPage') : data.json())
            .then(response => {
                setNote(response.reverse())
            })
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
    }, [])

    const openAddNoteForm = () => {
        deleteButton.classList.add('hidden')
        document.getElementById('title').value = ''
        document.getElementById('description').value = ''
        setModalActive(true)
    }

    const generateChangeNoteForm = (note) => {
        document.getElementById('title').value = note.title
        document.getElementById('description').value = note.description
        deleteButton.classList.remove('hidden')
        deleteButton.setAttribute('data-id', note.id)
        saveButton.setAttribute('data-id', note.id)
        setModalActive(true)
    }

    const openChangeNoteForm = (id) => {
        fetch(`http://localhost:8088/api/Notes/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `bearer ${jwtToken}`,
            }
        })
            .then(data => data.json())
            .then(response => generateChangeNoteForm(response))
    }

    document.querySelectorAll('.note').forEach(note => {
        note.addEventListener('click', (e) => {
            openChangeNoteForm(note.dataset.id);
        })
    })

    let inputHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };
    const filteredData = note.filter((note) => {
        if (inputHandler.input === '')
            return note;
        else
            return note.title.toLowerCase().includes(inputText) || note.description.toLowerCase().includes(inputText)
    })

    return (
        <div class="main">
            <div class="buttons">
                <button class="add-note-button" style={{ padding: "10px" }} onClick={openAddNoteForm}>Add Note</button>
                <button class="delete-all-note-button" style={{ padding: "10px" }} onClick={deleteAllNotes}>Delete All notes (DevTest)</button>
            </div>

            <input type="search" class="search" id="search" onChange={inputHandler}></input>

            <div class="notes-page" id="notes-container">
                {note && note.length > 0 && filteredData.map((noteObj, index) => (
                    <div class="note" data-id={noteObj.id} key={noteObj.id}>
                        <h3>{noteObj.title}</h3>
                        <p>{noteObj.description}</p>
                    </div>
                ))}

                <Modal active={modalActive} setActive={setModalActive}>
                    <input type="text" id="title" placeholder='Add title'></input>
                    <br />
                    <br />
                    <textarea rows="4" cols="50" id="description" name="description" placeholder='Add description'></textarea>
                    <br />
                    <br />
                    <button id="btnSave" class="btn-save" onClick={() => {
                        if (saveButton.dataset.id)
                            updateNote(saveButton.dataset.id)
                        else
                            addNote()
                    }} type="submit">Save</button>
                    <button id="btnDelete" class="btn-delete hidden" onClick={() => deleteNote(deleteButton.dataset.id)} type="submit">Delete</button>
                </Modal>
            </div>
        </div>
    );
}

export { ViewNotePage }