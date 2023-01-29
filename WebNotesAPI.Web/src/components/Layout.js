import './Layout.css'
import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <header class="layout_header">
                <NavLink to='/'>Home  </NavLink>
                <NavLink to='/AddNotePage'>Add Note </NavLink>
                <NavLink to='/ViewNotePage'>View Note </NavLink>
            </header>
            <Outlet />
        </>
    )
}
export { Layout }