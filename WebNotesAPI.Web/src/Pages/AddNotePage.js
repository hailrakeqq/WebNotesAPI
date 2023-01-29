import '../components/AddNotePage.css'

function AddNotePage() {
    let AddNote = () => {
        const note = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value
        }
        fetch('http://localhost:5013/api/Notes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(note)
        })
            .then(response => response.json())
            .then(response => console.log(response))
    }
    return (
        <div class="sending-form">
            <input type="text" id="title" placeholder='Add title'></input>
            <textarea rows="4" cols="50" id="description" name="description" form="noteform" placeholder='Add description'></textarea>
            <button onClick={AddNote} type="submit" >Save</button>
        </div>
    );
}

export { AddNotePage }