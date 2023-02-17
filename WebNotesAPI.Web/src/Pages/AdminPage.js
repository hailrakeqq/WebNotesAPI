import { useEffect, useState } from "react";
import { Modal } from "../components/Modal";

/*
   add input bar for search user
*/
function AdminPage() {
    const [users, setUsers] = useState([]);
    const promoteButton = document.querySelectorAll('.promoteUserBtn');
    const [modalActive, setModalActive] = useState(false)
    const [inputText, setInputText] = useState('');

    const checkButton = document.getElementById('check-btn');

    let getAllUsers = () => {
        fetch('http://localhost:5013/api/User', {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                'ownerId': localStorage.getItem('id'),
                'Authorization': `bearer ${localStorage.getItem('jwttoken')}`,
            }
        }).then(data => data.json())
            .then(responce => setUsers(responce))
    }

    useEffect(() => {
        getAllUsers()
        // eslint-disable-next-line
    }, {})

    const promoteUserToAdmin = (id) => {
        fetch(`http://localhost:5013/api/User/PromoteToAdmin/${id}`, {
            method: 'PUT',
            headers: {
                'adminId': localStorage.getItem('id'),
                'Authorization': `bearer ${localStorage.getItem('jwttoken')}`,
            }
        })
            .then(data => {
                console.log(data)
                document.location.reload(false)
            })
    }

    promoteButton.forEach(button => {
        button.addEventListener('click', (e) => {
            checkButton.setAttribute('data-id', button.dataset.id)
        })
    })

    let inputHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    const filteredData = users.filter((users) => {
        if (inputHandler.input === '')
            return users;
        else
            return users.username.toLowerCase().includes(inputText) || users.email.toLowerCase().includes(inputText)
    })

    return (
        <div>
            <h2>Admin Page</h2>
            <h3>User List</h3>
            <input type="search" class="search" id="search" onChange={inputHandler}></input>
            <div>
                <tr>
                    <th>Id</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Role</th>
                </tr>
                {users && users.length > 0 && filteredData.map((userObj, index) => (
                    <tr class="user" key={index}>
                        <th style={{ padding: "10px" }}>{userObj.id}</th>
                        <th class="email">{userObj.email}</th>
                        <th class="name">{userObj.username}</th>
                        <th>{userObj.role}</th>
                        <button class="promoteUserBtn" data-id={userObj.id} onClick={() => setModalActive(true)} >Change User Role</button>
                    </tr>
                ))}
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <div>
                    <p>Are you sure to promote this user to admin?</p>
                    <button id="check-btn" onClick={() => promoteUserToAdmin(checkButton.dataset.id)}>Yes</button>
                    <button onClick={() => setModalActive(false)}>No</button>
                </div>
            </Modal>
        </div>
    )
}

export { AdminPage }