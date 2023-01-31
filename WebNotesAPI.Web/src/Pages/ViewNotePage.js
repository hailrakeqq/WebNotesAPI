import React, { useEffect, useState } from 'react';
import '../css/ViewNotePage.css'
import { Modal } from '../components/Modal.js';
// import { AddNote } from '../AddNote.js'
/*to do
    add modal window to change note(+ delete function )
*/

function ViewNotePage() {
    const [note, setNote] = useState([]);
    const [modalActive, setModalActive] = useState(false)

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
                    "Access-Control-Allow-Origin": "*",
                    'content-type': 'application/json'
                },
                body: JSON.stringify(note)
            }).then(response => response.json())

            // clear input and close modal window and refresh page for render new note
            title = ""
            description = ""
            setModalActive(false)
            document.location.reload(true)
        }
    }

    const openAddNoteForm = () => {
        document.getElementById('title').value = ''
        document.getElementById('description').value = ''
        setModalActive(true)
    }

    // const deleteNote = () => {
    //     alert("test")
    // }

    const fetchData = () => {
        return fetch('http://localhost:5013/api/Notes')
            .then(data => data.json())
            .then(responce => setNote(responce.reverse()))
    }

    useEffect(() => {
        fetchData()
    }, [])

    const generateChangeNoteForm = (note) => {
        document.getElementById('title').value = note.title
        document.getElementById('description').value = note.description
        // document.getElementsByClassName('#delete-button').classList.remove("hidden")
        setModalActive(true)
    }

    const openChangeNoteForm = (id) => {
        fetch(`http://localhost:5013/api/Notes/${id}`)
            .then(data => data.json())
            .then(response => generateChangeNoteForm(response))
    }

    document.querySelectorAll('.note').forEach(note => {
        note.addEventListener('click', function (e) {
            openChangeNoteForm(note.dataset.id);
        })
    })

    return (
        <div class="main">
            <button class="add-note-button" onClick={openAddNoteForm}>Add Note Test</button>

            <div class="notes-page" id="notes-container">
                {note && note.length > 0 && note.map((noteObj, index) => (
                    <div class="note" data-id={noteObj.id} key={index}>
                        <h3>{noteObj.title}</h3>
                        <p>{noteObj.description}</p>
                    </div>
                ))}

                {/* modal window with form for add note to db*/}
                <Modal active={modalActive} setActive={setModalActive}>
                    <input type="text" id="title" placeholder='Add title'></input>
                    <br />
                    <textarea rows="4" cols="50" id="description" name="description" placeholder='Add description'></textarea>
                    <br />
                    <button onClick={addNote} type="submit" >Save</button>
                    {/* <button class="delete-button hidden" onClick={deleteNote} type="submit">Delete</button> */}
                </Modal>
            </div>
        </div>
    );
}

export { ViewNotePage }