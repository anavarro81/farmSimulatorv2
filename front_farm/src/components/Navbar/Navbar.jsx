import React, { useContext } from 'react'

import { NavLink, Outlet } from "react-router-dom";


//   import "../App.css";

const NavBar = () => {

  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  const userID=localStorage.getItem('userID')

  console.log("Estoy conectado con el rol", role);
  console.log("Conectado con id", userID )

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('userID')
  }

  return  <>
  
    <header>
    
    <nav>
        <div className='flex-sp-btw'>
        <NavLink to="/home" className={({ isActive }) => isActive ? "active" : ""}> <span>Home</span></NavLink>
        {!token && <NavLink to="/" className={({ isActive }) => isActive ? "active" : "" } > <span>Login</span> </NavLink>}
        <NavLink to="/parcel" className={({ isActive }) => isActive ? "active" : ""}> <span>Parcel</span> </NavLink>
        <NavLink to="/user" className={({ isActive }) => isActive ? "active" : ""}> <span>User</span></NavLink>
        <NavLink to="/invoice" className={({ isActive }) => isActive ? "active" : ""}> <span>Invoice</span></NavLink>
        <NavLink to="/calendar" className={({ isActive }) => isActive ? "active" : ""}> <span>Calendar</span></NavLink>
        {!token && <NavLink to="/register" className={({ isActive }) => isActive ? "active" : ""}> <span> Register </span></NavLink>}
        {token && <NavLink to="/" onClick={logout} className={({ isActive }) => isActive ? "active" : ""}> <span> Logout </span></NavLink>}
        </div>
        
    </nav>

    </header>
    <Outlet />
    
  
  </>
}

export default NavBar