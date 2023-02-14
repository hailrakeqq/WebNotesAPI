import { Modal } from '../components/Modal.js';
import React, { useEffect, useState } from 'react';
import '../css/UserManagePage.css'

/*
    implement all 3 function
*/
function UserManagePage() {
    const jwtToken = localStorage.getItem('jwttoken')
    const [user, setUser] = useState({});
    const [modalActive, setModalActive] = useState(false)
    const modalContent = document.getElementById('modal-content')

    const getUser = () => {
        fetch(`http://localhost:5013/api/User/${localStorage.getItem('id')}`, {
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
            "<button id=\"btnSave\" class=\"btn-save\" type=\"submit\" onClick={changeEmail}>Save</button>"
        setModalActive(true)
    }
    const changeEmail = () => {

    }

    const changeUsernameModal = () => {
        modalContent.innerHTML =
            "<p>Change Username...</p>" +
            "<br />" +
            "<input type=\"text\" id=\"new-email\" placeholder='Enter new username...'></input>" +
            "<br />" +
            "<br />" +
            "<input type=\"text\" id=\"check-password\" placeholder='Password for confirm...'></input>" +
            "<br />" +
            "<br />" +
            "<button id=\"btnSave\" class=\"btn-save\" type=\"submit\" onClick={changeUsername}>Save</button>"
        setModalActive(true)
    }
    const changeUsername = () => { }

    const changePasswordModal = () => {
        modalContent.innerHTML =
            "<p>Change Username...</p>" +
            "<br />" +
            "<input type=\"text\" id=\"new-email\" placeholder='Enter old password...'></input>" +
            "<br />" +
            "<br />" +
            "<input type=\"text\" id=\"check-password\" placeholder='Enter new password...'></input>" +
            "<br />" +
            "<br />" +
            "<button id=\"btnSave\" class=\"btn-save\" type=\"submit\" onClick={changePassword}>Save</button>"
        setModalActive(true)
    }
    const changePassword = () => { }

    const deleteAccountModal = () => {
        document.getElementById('modal-content').innerHTML =
            "<p>Delete Account</p><br/><input type=\"text\" id=\"confirmPassword\" placeholder='Enter password for confirm..'></input><br/><br/>" +
            " <button id=\"btnSave\" class=\"btn-save\" type=\"submit\">Delete Account</button>"

        setModalActive(true)
    }
    return (
        <>
            <h3>Test user manage page</h3>
            <ul>
                <li><p>Email: {user.email} <button class="manage-button" id="change-email-btn" onClick={changeEmailModal}>Change Email</button></p> </li>
                <li><p>Username: {user.username} <button class="manage-button" id="change-username-btn" onClick={changeUsernameModal}>Change Username</button></p></li>
                <li><p>Password <button class="manage-button" id="change-password-btn" onClick={changePasswordModal}>Change Password</button></p> </li>
                <li><button id="delete-account-btn" onClick={deleteAccountModal}>Delete Account</button></li>
            </ul>

            <Modal active={modalActive} setActive={setModalActive}>
                <div id="modal-content"></div>
            </Modal>
        </>
    );
}

export { UserManagePage }