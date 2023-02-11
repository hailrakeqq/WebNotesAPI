import '../css/Layout.css'
import { NavLink, Outlet } from "react-router-dom";

/*
    add style to header
*/

const Layout = () => {
    return (
        <>
            <header class="layout_header">
                <NavLink to='/'>Home  </NavLink>
                <NavLink to='/ViewNotePage'>My Note </NavLink>
                <NavLink to='/LoginPage'>Login</NavLink>
                <NavLink to='/SigninPage'>Sign In</NavLink>
            </header>
            <Outlet />
        </>
    )
}
export { Layout }