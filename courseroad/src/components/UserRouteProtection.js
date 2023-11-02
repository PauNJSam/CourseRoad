import React, { useEffect } from 'react'
import { auth } from "../config/firebase";
import { Navigate, Outlet } from 'react-router-dom';

const UserRouteProtection = () => {
    let isLogged = localStorage.getItem("authedUser");
    
  return (
    isLogged == null ? <Navigate to='/' /> : <Outlet/>
  )
}

export default UserRouteProtection