import { useEffect, useState } from "react";

/*
    modal for change user role
    change user role function
*/
function AdminPage() {
    const [user, setUser] = useState({});
    let getAllUsers = () => {
        fetch('http://localhost:5013/api/User', {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                'ownerId': localStorage.getItem('id'),
                'Authorization': `bearer ${localStorage.getItem('jwttoken')}`,
            }
        }).then(data => data.json())
            .then(responce => setUser(responce))
    }

    useEffect(() => {
        getAllUsers()
        // eslint-disable-next-line
    }, {})

    console.log(user);
    return (
        <>
            <h2>Admin Page</h2>
            <h3>User List</h3>
            <div>
                <tr>
                    <th>Id</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Role</th>
                </tr>
                {user && user.length > 0 && user.map((userObj, index) => (
                    <tr class="user" data-id={userObj.id} key={index}>
                        <th style={{ padding: "10px" }}>{userObj.id}</th>
                        <th>{userObj.email}</th>
                        <th>{userObj.username}</th>
                        <th>{userObj.role}</th>
                        <button>Change User Role</button>
                    </tr>
                ))}
            </div>
        </>
    )
}

export { AdminPage }