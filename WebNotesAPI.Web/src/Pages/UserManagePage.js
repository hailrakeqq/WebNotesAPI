import { Modal } from '../components/Modal.js';
import React, { useEffect, useState } from 'react';
import '../css/UserManagePage.css'
import { useNavigate } from 'react-router-dom';


/**
 * 
 * fix error when click on button which should open modal window works reques function also
 */
function UserManagePage() {
    const jwtToken = localStorage.getItem('jwttoken')
    const [user, setUser] = useState({});
    const [modalActive, setModalActive] = useState(false)
    const modalContent = document.getElementById('modal-content')
    const navigate = useNavigate()
    const succesfullyResponceMessage = "Your new data has been successfully saved"
    const errorResponceMessage = "An error has occurred when we try to change your new data :("

    const getUser = () => {//5013
        fetch(`http://localhost:8088/api/User/${localStorage.getItem('id')}`, {
            method: 'GET',
            headers: {
                'Authorization': `bearer ${jwtToken}`,
                'content-type': 'application/json'
            }
        }).then(data => data.json())
            .then(data => setUser(data))
    }

    // eslint-disable-next-line
    useEffect(() => getUser(), user)

    const createPUTRequest = (request, data) => {
        const sendedRequest = fetch(`http://localhost:8088/api/User/${request}/${localStorage.getItem('id')}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${jwtToken}`,
            },
            body: JSON.stringify(data)
        })

        return sendedRequest
    }

    const changeEmail = () => {
        let newEmail = document.getElementById('new-email').value;
        let checkPassword = document.getElementById('check-password').value

        if (newEmail !== "" && newEmail !== null && checkPassword !== "" && checkPassword !== null) {
            let data = {
                "email": newEmail,
                "confirmPassword": checkPassword
            }
            createPUTRequest('ChangeEmail', data).then(response => {
                if (response.status === 200) {
                    alert(succesfullyResponceMessage)
                    setModalActive(false)
                    document.location.reload(false)
                } else {
                    alert(errorResponceMessage)
                    newEmail = ""
                    checkPassword = ""
                }
            })
        }
        else alert("You enter uncorrect data")
    }

    const changeEmailModal = () => {
        modalContent.innerHTML =
            "<p>Change Email...</p>" +
            "<br />" +
            "<input type=\"text\" id=\"new-email\" placeholder='Enter new email...'></input>" +
            "<br />" +
            "<br />" +
            "<input type=\"text\" id=\"check-password\" placeholder='Password for confirm...'></input>" +
            "<br />" +
            "<br />" +
            "<button id='changeEmailBtn' class=\"btn-save\" type=\"submit\">Save</button>"

        setModalActive(true)
        document.getElementById('changeEmailBtn').addEventListener('click', changeEmail)
    }

    const changeUsername = () => {
        let newUsername = document.getElementById('new-username').value;
        let checkPassword = document.getElementById('check-password').value
        if (newUsername !== null && checkPassword !== null && newUsername !== "" && checkPassword !== "") {
            const data = {
                "username": newUsername,
                "confirmPassword": checkPassword
            }
            createPUTRequest("ChangeUsername", data)
                .then(response => {
                    if (response.status === 200) {
                        alert(succesfullyResponceMessage)
                        localStorage.setItem('username', newUsername)
                        setModalActive(false)
                        document.location.reload(false)
                    }
                    else {
                        alert(errorResponceMessage)
                        newUsername = ""
                        checkPassword = ""
                    }
                })

        }
    }

    const changeUsernameModal = () => {
        modalContent.innerHTML =
            "<p>Change Username...</p>" +
            "<br />" +
            "<input type=\"text\" id=\"new-username\" placeholder='Enter new username...'></input>" +
            "<br />" +
            "<br />" +
            "<input type=\"text\" id=\"check-password\" placeholder='Password for confirm...'></input>" +
            "<br />" +
            "<br />" +
            "<button id='changeUsernameBtn' class=\"btn-save\" type=\"submit\">Save</button>"

        setModalActive(true)
        document.getElementById('changeUsernameBtn').addEventListener('click', changeUsername)
    }

    const changePassword = () => {
        let oldPassword = document.getElementById('old-password').value;
        let newPassword = document.getElementById('new-password').value
        if (oldPassword !== null && newPassword !== null && oldPassword !== "" && newPassword !== "") {
            const data = {
                "password": newPassword,
                "confirmPassword": oldPassword
            }
            createPUTRequest("ChangePassword", data)
                .then(response => {
                    console.log(response);
                    if (response.status === 200) {
                        alert(succesfullyResponceMessage)
                        setModalActive(false)
                        document.location.reload(false)
                    } else {
                        alert(errorResponceMessage)
                        oldPassword = ""
                        newPassword = ""
                    }
                })
        }
    }

    const changePasswordModal = () => {
        modalContent.innerHTML =
            "<p>Change Password...</p>" +
            "<br />" +
            "<input type=\"text\" id=\"old-password\" placeholder='Enter old password...'></input>" +
            "<br />" +
            "<br />" +
            "<input type=\"text\" id=\"new-password\" placeholder='Enter new password...'></input>" +
            "<br />" +
            "<br />" +
            "<button id='changePasswordBtn' class=\"btn-save\" type=\"submit\" >Save</button>"

        setModalActive(true)
        document.getElementById('changePasswordBtn').addEventListener('click', changePassword)
    }

    const deleteAccount = () => {
        let confirmPassword = document.getElementById('confirmPassword').value
        if (confirmPassword !== "" || confirmPassword !== null) {
            fetch(`http://localhost:8088/api/User/${localStorage.getItem('id')}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `bearer ${jwtToken}`,
                },
                body: JSON.stringify({
                    "confirmPassword": confirmPassword
                })
            }).then(responce => {
                if (responce.status === 200) {
                    alert("You successfully delete your account")
                    localStorage.clear();
                    navigate('/');
                } else {
                    setModalActive(false)
                    alert(errorResponceMessage)
                }
            })

        }
    }
    const deleteAccountModal = () => {
        modalContent.innerHTML =
            `<p>Delete Account</p><br/><input type='text' id='confirmPassword' placeholder='Enter password for confirm..'></input><br/><br/>` +
            `<button id='btnDeleteAccount' class='btn-save' type='submit'>Delete Account</button>`

        setModalActive(true)
        document.getElementById('btnDeleteAccount').addEventListener('click', deleteAccount);
    }

    return (
        <>
            <div class="main">
                <button onClick={() => navigate('/')}>Go to my note</button>
                <h3>User manage page</h3>
                <ul>
                    <li><p>Email: {user.email} <button class="manage-button" id="change-email-btn" onClick={changeEmailModal}>Change Email</button></p> </li>
                    <li><p>Username: {user.username} <button class="manage-button" id="change-username-btn" onClick={changeUsernameModal}>Change Username</button></p></li>
                    <li><p>Password <button class="manage-button" id="change-password-btn" onClick={changePasswordModal}>Change Password</button></p> </li>
                    <li><button id="delete-account-btn" onClick={deleteAccountModal}>Delete Account</button></li>
                </ul>
            </div>

            <Modal active={modalActive} setActive={setModalActive}>
                <div id="modal-content"></div>
            </Modal>
        </>
    );
}

export { UserManagePage }