import '../css/Layout.css'
import { NavLink, Outlet, useNavigate } from "react-router-dom";

/*
    add style to header
*/

const Layout = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/');
    }
    const currentUser = localStorage.getItem('username')
    const userRole = localStorage.getItem('role')
    return (
        <>
            <header class="layout_header">
                <div class="navbar">
                    <div class="home-note-button">
                        <NavLink to='/' style={{ padding: "10px", textDecoration: 'none' }}>Home  </NavLink>
                        <NavLink to={currentUser !== null ? '/ViewNotePage' : '/LoginPage'} style={{ padding: "10px", textDecoration: 'none' }}>My Note </NavLink>
                    </div>
                    <div class="dropdown">
                        {
                            currentUser === null ? <NavLink to='/LoginPage' style={{ padding: "10px", textDecoration: 'none' }}>Login</NavLink>
                                :
                                <div>
                                    <button class="dropbtn">{localStorage.getItem('username')}
                                        <i class="fa fa-caret-down"></i>
                                    </button>
                                    <div class="dropdown-content">
                                        <NavLink to='/UserManagePage' style={{ padding: "10px" }}>My Account</NavLink>
                                        {userRole === 'admin' ?
                                            <NavLink to='/AdminPage' style={{ padding: "10px" }}>Admin Page</NavLink>
                                            : <></>
                                        }
                                        <NavLink to='/' onClick={logout} style={{ padding: "10px" }}>Logout</NavLink>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </header>
            <Outlet />
        </>
    )
}
export { Layout }