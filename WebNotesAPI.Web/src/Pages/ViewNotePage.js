import React, { useEffect, useState } from 'react';
import '../components/ViewNotePage.css'

/*to do
    add change page(+ delete function)
*/

function ViewNotePage() {
    const [note, setNote] = useState([]);

    const fetchData = () => {
        return fetch('http://localhost:5013/api/Notes')
            .then(data => data.json())
            .then(responce => setNote(responce.reverse()))
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div class="notes-page" id="notes-container">
            {note && note.length > 0 && note.map((noteObj, index) => (
                <div class="note">
                    <h3>{noteObj.title}</h3>
                    <p>{noteObj.description}</p>
                </div>
            ))}
        </div>
    );
}

export { ViewNotePage }