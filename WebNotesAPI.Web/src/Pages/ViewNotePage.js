import { Component } from 'react'
import '../components/ViewNotePage.css'


/*to do:
    add render  note from db
    add change page(+ delete function)
*/
function ViewNotePage() {
    let getAllNote = () => {
        fetch('http://localhost:5013/api/Notes')
            .then(data => data.json)
            .then(data => console.log(data))
    }
    let renderNote = (notes) => {
        let allNote = ''
        const notesField = document.getElementById('notes-page');
        notes.forEach(note => {
            const noteElement = `
                                <div class="note">
                                    <h3>${note.title}</h3>
                                    <p>${note.description}</p>
                                </div>
                                `
            allNote += noteElement
        })
        notesField.innerHTML = allNote;
    }

    return (
        <div class="notes-page" >

        </div>
    );
}

export { ViewNotePage }