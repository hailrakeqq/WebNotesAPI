import React, { useEffect, useState } from 'react';
import '../css/ViewNotePage.css'
import { Modal } from '../components/Modal.js';

function ViewNotePage() {
    const [note, setNote] = useState([]);
    const [modalActive, setModalActive] = useState(false)
    const saveButton = document.querySelector('#btnSave')
    const deleteButton = document.querySelector('#btnDelete')

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
            fetch('http://localhost:5013/api/Notes', {
                method: 'POST',
                headers: {
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
            fetch(`http://localhost:5013/api/Notes/${id}`, {
                method: 'PUT',
                headers: {
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
        fetch(`http://localhost:5013/api/Notes/${id}`, {

            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        }).then(() => {
            setModalActive(false)
            document.location.reload(false)
        })
    }

    const deleteAllNotes = () => {
        fetch(`http://localhost:5013/api/Notes/`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        }).then(() => document.location.reload(false))
    }

    const fetchData = () => {
        return fetch('http://localhost:5013/api/Notes')
            .then(data => data.json())
            .then(responce => setNote(responce.reverse()))
    }

    useEffect(() => {
        fetchData()
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
        fetch(`http://localhost:5013/api/Notes/${id}`)
            .then(data => data.json())
            .then(response => generateChangeNoteForm(response))
    }

    document.querySelectorAll('.note').forEach(note => {
        note.addEventListener('click', (e) => {
            openChangeNoteForm(note.dataset.id);
        })
    })

    return (
        <div class="main">
            <button class="add-note-button" onClick={openAddNoteForm}>Add Note (Test)</button>
            <button class="delete-all-note-button" onClick={deleteAllNotes}>Delete All notes (DevTest)</button>
            <div class="notes-page" id="notes-container">
                {note && note.length > 0 && note.map((noteObj, index) => (
                    <div class="note" data-id={noteObj.id} key={index}>
                        <h3>{noteObj.title}</h3>
                        <p>{noteObj.description}</p>
                    </div>
                ))}

                {/* modal window with form for add note to db or change current note*/}
                <Modal active={modalActive} setActive={setModalActive}>
                    <input type="text" id="title" placeholder='Add title'></input>
                    <br />
                    <textarea rows="4" cols="50" id="description" name="description" placeholder='Add description'></textarea>
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